package il.ac.bgu.bp.cotextualBlockly;

import il.ac.bgu.bp.cotextualBlockly.context.SimulatedTimeInjector;
import il.ac.bgu.bp.cotextualBlockly.context.TimeInjector;
import il.ac.bgu.cs.bp.bpjs.context.ContextService;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import org.hibernate.Session;
import org.sqlite.Function;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ContextInstance {
    private String[] programs;
    private BProgram bprog;
    public ContextService contextService;
    private static Thread timeInjectorThread;
    private static TimeInjector timeInjector;


    public ContextInstance(String ... programs) {
        this.programs = programs;
    }

    public boolean pushToExternal(BEvent event){
        if(bprog != null) {
            bprog.enqueueExternalEvent(event);
            return true;
        }
        return false;
    }

    public boolean addListener(BProgramRunnerListener listener){
        if (contextService != null) {
            contextService.addListener(listener);
            return true;
        }
        return false;
    }

    public void reset(){
        // Stop the current deployment
        if (contextService != null) {
            contextService.close();
        }
        contextService = ContextService.getInstance();

//		Use contextService.initFromString to init from the blockly code
        contextService.initFromResources("ContextDB",  programs);
//		contextService.initFromString("ContextDB", code);
        contextService.addEntityManagerCreateHook(em -> {
            Session session = em.unwrap(Session.class);

            session.doWork(connection -> Function.create(connection, "CURRENT_TIMESTAMP", new Function() {
                @Override
                protected void xFunc() throws SQLException {
                    result(TimeInjector.getCurrentTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")));
                }
            }));
        });
        bprog = contextService.getBProgram();
        bprog.setWaitForExternalEvents(true);

        // Start a new deployment
        contextService.run();
        try { Thread.sleep(2000); } catch (InterruptedException e) { }
        LocalDateTime a=LocalDateTime.now();
        LocalDateTime rightNow = LocalDateTime.of(a.getYear(),a.getMonth(),a.getDayOfMonth(),a.getHour()-3,a.getMinute());
        System.out.println("current datetime : " + rightNow);
        timeInjector = new SimulatedTimeInjector(rightNow,50,this);
        timeInjectorThread = new Thread(timeInjector);
        timeInjectorThread.run();

    }
}