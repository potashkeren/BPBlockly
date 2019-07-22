package il.ac.bgu.bp.cotextualBlockly;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.websocket.server.ServerEndpointConfig;
import com.google.common.collect.ImmutableMap;
import il.ac.bgu.bp.cotextualBlockly.context.SimulatedTimeInjector;
import il.ac.bgu.bp.cotextualBlockly.context.TimeInjector;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.websocket.jsr356.server.ServerContainer;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.sqlite.Function;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Formatter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * The save servlet is used to echo XML to the client, eg. for SVG export and saving (see
 * Dialogs.js:SaveDialog and ExportDialog). The export servlet is used to implement image and PDF
 * export (see Dialogs.js:ExportDialog). Note that the CSS support is limited to the following for
 * all HTML markup: http://docs.oracle.com/javase/6/docs/api/index.html?javax/swing/text/html/CSS
 * .html The open servlet is used to open files. It does this by calling some JavaScript hook in the
 * client-side page (see open.html).
 */
public class BPServer {


    public static int PORT = 8080;
    private static ContextInstance contextInstance;

    /**
     * Uncomment this for better font size rendering in px units within labels.
     */
    static {
        // mxGraphicsCanvas2D.HTML_SCALE = 0.75;
        // mxGraphicsCanvas2D.HTML_UNIT = "px";
    }

    /**
     * Point your browser to http://localhost:8080/javascript/examples/floweditor/www/index.html
     */
    public static void main(String[] args) throws Exception {

        contextInstance = new ContextInstance("Tests.js","Labs_Experiment.js");
       // testTIme();
        Server server = new Server(PORT);

        // Servlets

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        // context.addServlet(new ServletHolder(new EchoServlet()), "/save");
        // context.addServlet(new ServletHolder(new ExportServlet()), "/export");
        // context.addServlet(new ServletHolder(new FlowOpenServlet()), "/open");
        context.addServlet(new ServletHolder(new RunServlet(contextInstance)), "/run");

        ResourceHandler fileHandler = new ResourceHandler();
        fileHandler.setResourceBase(".");

        // Add javax.websocket support
        ServerContainer container = WebSocketServerContainerInitializer.configureContext(context);

        // Add debug endpoint to server container
        ServerEndpointConfig echoConfig =
                ServerEndpointConfig.Builder.create(DebugEndPoint.class, "/debug").build();
        container.addEndpoint(echoConfig);

        // Add endpoint to server container
        ServerEndpointConfig cfg =
                ServerEndpointConfig.Builder.create(EventQueue.class, "/eventqueue").build();
        container.addEndpoint(cfg);

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] {fileHandler, context});
        server.setHandler(handlers);

        System.out.println(
                ">> Go to http://localhost:" + PORT + "/blockly-editor/blockly-files/index.html");
        // System.out.println(">> Go to http://localhost:" + PORT +
        // "/blockly-editor/TicTacToe/TTT.html");

        server.start();
        server.join();
    }

    private static void testTIme() throws InterruptedException {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("ContextDB",
                ImmutableMap.builderWithExpectedSize(1)
                        .put("javax.persistence.sharedCache.mode", "NONE").build());

        //String query = "select strftime('%w',current_timestamp) AS t";
        //String query = "select julianday(time(current_timestamp)) AS t";
        String query = "select ((julianday(time(1563362280,'unixepoch', 'localtime'))-julianday(time(current_timestamp)))*24*60) AS t";


        LocalDateTime a = LocalDateTime.now();
        LocalDateTime rightNow = LocalDateTime.of(a.getYear(), a.getMonth(), a.getDayOfMonth(),
                a.getHour() - 3, a.getMinute(), 0, 0).minusDays(1);
        System.out.println("init datetime : " + rightNow);
        EntityManager em = emf.createEntityManager();
        System.out.println("before mock: " + em.createNativeQuery(query).getResultList());
        // mockCurrentTime(em.unwrap(Session.class), rightNow);
        // System.out.println("mocked time: " +  em.createNativeQuery(query).getResultList());
        new Thread(new SimulatedTimeInjector(contextInstance, rightNow, 50)).start();
        
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    try {
                        Thread.sleep(1000);

                        LocalDateTime time = TimeInjector.getCurrentTime();
                        System.out.println("time is " + time);
                        EntityManager em = emf.createEntityManager();
                        mockCurrentTime(em.unwrap(Session.class), time);
                        System.out.println("mocked time: " + em.createNativeQuery(query).getResultList());
                        em.close();
                    } catch (InterruptedException e) { }
                }
            }
        });
        t.start();
        try {
            t.join(10000);
        } catch (InterruptedException e) { }
        
        System.exit(1);
    }

    private static void mockCurrentTime(Session session, LocalDateTime time) {
        String sTime = time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));
        addSqliteFunction(session,"CURRENT_TIMESTAMP", sTime);
    }
    private static void addSqliteFunction(Session session, String functionName, String retVal) {
        session.doWork(new Work() {
            @Override
            public void execute(Connection connection) throws SQLException {
                Function.create(connection, functionName, new Function() {
                    @Override
                    protected void xFunc() throws SQLException {
                        result(retVal);
                    }
                });
            }
        });
    }

}
