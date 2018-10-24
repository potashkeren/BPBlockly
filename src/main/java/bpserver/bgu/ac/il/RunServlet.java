package bpserver.bgu.ac.il;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.PrintBProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.StringBProgram;

public class RunServlet extends HttpServlet {

	final static Logger LOG = LoggerFactory.getLogger(RunServlet.class);

	/**
	 *
	 */
	private static final long serialVersionUID = -1598336877581962216L;

	// A hack that only works if one program is running at a time!
	public static BProgram bprog;
	public static BProgramRunner rnr;

	private static Thread thread;

	/**
	 * Handles save request and prints XML.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Extract the XML fro the message
		BufferedReader br = request.getReader();
		String code = IOUtils.toString(br);

		// Stop the current deployment
		if (thread != null)
			thread.interrupt();

		// Start a new deployment
		bprog = new StringBProgram(code);

		//bprog.setDaemonMode(true);

		rnr = new BProgramRunner(bprog);
		rnr.addListener(new PrintBProgramRunnerListener());

		thread = new Thread() {
			public void run() {
				// go!
				try {
					rnr.run();
					throw new InterruptedException();
				} catch (InterruptedException e) {
					LOG.info("BProgram runner interrupted");
				}
			}
		};

		thread.start();

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