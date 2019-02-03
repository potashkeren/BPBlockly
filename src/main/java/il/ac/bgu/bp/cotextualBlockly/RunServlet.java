package il.ac.bgu.bp.cotextualBlockly;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import il.ac.bgu.cs.bp.bpjs.context.ContextService;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.eventselection.PrioritizedBSyncEventSelectionStrategy;

public class RunServlet extends HttpServlet {
	private static String code;
	final static Logger LOG = LoggerFactory.getLogger(RunServlet.class);

	/**
	 *
	 */
	private static final long serialVersionUID = -1598336877581962216L;

	// A hack that only works if one program is running at a time!
	private static BProgram bprog;
	private static ContextService contextService;

	public static boolean pushToExternal(BEvent event){
		if(bprog != null) {
			bprog.enqueueExternalEvent(event);
			return true;
		}
		return false;
	}

	public static boolean addListener(BProgramRunnerListener listener){
		if (contextService != null) {
			contextService.addListener(listener);
			return true;
		}
		return false;
	}

	public static void reset(){
		// Stop the current deployment
		if (contextService != null) {
			contextService.close();
		}
		contextService = ContextService.getInstance();
		contextService.init("ContextDB");

		// Start a new deployment
		bprog = contextService.run("Contextual_TTT_population.js", "Contextual_TTT.js");
//		bprog = new StringBProgram(code);

		bprog.setEventSelectionStrategy(new PrioritizedBSyncEventSelectionStrategy());
		bprog.setWaitForExternalEvents(true);


		try { Thread.sleep(2000); } catch (InterruptedException e) { }
//        bprog.enqueueExternalEvent(new BEvent("test"));
//        bprog.enqueueExternalEvent(new BEvent("Click","{_row:1,_col:1}"));

		//bprog.enqueueExternalEvent(new BEvent("Click",new json {_row:1,_col:0}));
	}

	/**
	 * Handles save request and prints XML.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Extract the XML fro the message
		BufferedReader br = request.getReader();
		RunServlet.code = IOUtils.toString(br);
		reset();
		response.getOutputStream().println("Succesfully deployed:");
		response.setStatus(HttpServletResponse.SC_OK);
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0
		response.setHeader("Cache-control", "private, no-cache, no-store");
		response.setHeader("Expires", "0");

		// response.getWriter().println(createGraph(request));
		response.setStatus(HttpServletResponse.SC_OK);
	}
}