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
import il.ac.bgu.cs.bp.bpjs.model.eventselection.PrioritizedBSyncEventSelectionStrategy;

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
		String s = "bp.log.info('Tic-Tac-Toe - Let the game begin!');\n" +
                "\n" +
                "// GameRules:\n" +
                "\n" +
                "// This BThreads are on each square of the grid\n" +
                "function addSquareBThreads(row, col) {\n" +
                "\n" +
                "    // Detects mouse click\n" +
                "    bp.registerBThread(\"ClickHandler(\" + row + \",\" + col + \")\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('Click',{ _row:row, _col:col}) ] });\n" +
                "            bp.sync({ request:[ bp.Event('X',{_row:row, _col:col}) ] });\n" +
                "        }\n" +
                "    });\n" +
                "\n" +
                "    // Blocks further marking of a square already marked by X or O.\n" +
                "    bp.registerBThread(\"SquareTaken(\" + row + \",\" + col + \")\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:row, _col:col}), bp.Event('O',{_row:row, _col:col})] });\n" +
                "            bp.sync({ block:[ bp.Event('X',{_row:row, _col:col}), bp.Event('O',{_row:row, _col:col}) ] });\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "for (var r = 0; r < 3; r++) {\n" +
                "    for (var c = 0; c < 3; c++) {\n" +
                "        addSquareBThreads(r, c);\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "// Represents Enforce Turns\n" +
                "bp.registerBThread(\"EnforceTurns\", function() {\n" +
                "    while (true) {\n" +
                "        bp.sync({waitFor:[\n" +
                "            bp.Event('X',{_row:0, _col:0}), bp.Event('X',{_row:0, _col:1}), bp.Event('X',{_row:0, _col:2}),\n" +
                "            bp.Event('X',{_row:1, _col:0}), bp.Event('X',{_row:1, _col:1}), bp.Event('X',{_row:1, _col:2}),\n" +
                "            bp.Event('X',{_row:2, _col:0}), bp.Event('X',{_row:2, _col:1}), bp.Event('X',{_row:2, _col:2}) ],\n" +
                "        block:[\n" +
                "            bp.Event('O',{_row:0, _col:0}), bp.Event('O',{_row:0, _col:1}), bp.Event('O',{_row:0, _col:2}),\n" +
                "            bp.Event('O',{_row:1, _col:0}), bp.Event('O',{_row:1, _col:1}), bp.Event('O',{_row:1, _col:2}),\n" +
                "            bp.Event('O',{_row:2, _col:0}), bp.Event('O',{_row:2, _col:1}), bp.Event('O',{_row:2, _col:2}) ] });\n" +
                "\n" +
                "        bp.sync({\n" +
                "            waitFor:[\n" +
                "                bp.Event('O',{_row:0, _col:0}), bp.Event('O',{_row:0, _col:1}), bp.Event('O',{_row:0, _col:2}),\n" +
                "                bp.Event('O',{_row:1, _col:0}), bp.Event('O',{_row:1, _col:1}), bp.Event('O',{_row:1, _col:2}),\n" +
                "                bp.Event('O',{_row:2, _col:0}), bp.Event('O',{_row:2, _col:1}), bp.Event('O',{_row:2, _col:2}) ],\n" +
                "            block:[\n" +
                "                bp.Event('X',{_row:0, _col:0}), bp.Event('X',{_row:0, _col:1}), bp.Event('X',{_row:0, _col:2}),\n" +
                "                bp.Event('X',{_row:1, _col:0}), bp.Event('X',{_row:1, _col:1}), bp.Event('X',{_row:1, _col:2}),\n" +
                "                bp.Event('X',{_row:2, _col:0}), bp.Event('X',{_row:2, _col:1}), bp.Event('X',{_row:2, _col:2})] });\n" +
                "    }\n" +
                "});\n" +
                "\n" +
                "// Represents when the game ends\n" +
                "bp.registerBThread(\"EndOfGame\", function() {\n" +
                "    bp.sync({ waitFor:[ bp.Event('OWin'), bp.Event('XWin'), bp.Event('Draw') ] });\n" +
                "\n" +
                "    bp.sync({ block:[\n" +
                "            bp.Event('X',{_row:0, _col:0}), bp.Event('X',{_row:0, _col:1}), bp.Event('X',{_row:0, _col:2}),\n" +
                "            bp.Event('X',{_row:1, _col:0}), bp.Event('X',{_row:1, _col:1}), bp.Event('X',{_row:1, _col:2}),\n" +
                "            bp.Event('X',{_row:2, _col:0}), bp.Event('X',{_row:2, _col:1}), bp.Event('X',{_row:2, _col:2}),\n" +
                "            bp.Event('O',{_row:0, _col:0}), bp.Event('O',{_row:0, _col:1}), bp.Event('O',{_row:0, _col:2}),\n" +
                "            bp.Event('O',{_row:1, _col:0}), bp.Event('O',{_row:1, _col:1}), bp.Event('O',{_row:1, _col:2}),\n" +
                "            bp.Event('O',{_row:2, _col:0}), bp.Event('O',{_row:2, _col:1}), bp.Event('O',{_row:2, _col:2})\n" +
                "        ] });\n" +
                "});\n" +
                "\n" +
                "var move = bp.EventSet(\"Move events\", function(e) {\n" +
                "    return e.name === 'O' || e.name === 'X';\n" +
                "});\n" +
                "\n" +
                "// Represents when it is a draw\n" +
                "bp.registerBThread(\"DetectDraw\", function() {\n" +
                "    // For debug\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    bp.sync({ waitFor:[ move ] });\n" +
                "    /*\n" +
                "     * for (var i=0; i< 9; i++) { bp.sync({ waitFor:[ move ] }); }\n" +
                "     */\n" +
                "\n" +
                "    bp.sync({ request:[ bp.Event('Draw') ] }, 90);\n" +
                "});\n" +
                "\n" +
                "function addLinePermutationBthreads(l, p) {\n" +
                "\n" +
                "    // Represents when X wins\n" +
                "    bp.registerBThread(\"DetectXWin(<\" + l[p[0]].x + \",\" + l[p[0]].y + \">,\" + \"<\" + l[p[1]].x + \",\" + l[p[1]].y + \">,\" + \"<\" + l[p[2]].x + \",\" + l[p[2]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:l[p[0]].x, _col:l[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:l[p[1]].x, _col:l[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:l[p[2]].x, _col:l[p[2]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('XWin') ] }, 100);\n" +
                "\n" +
                "        }\n" +
                "    });\n" +
                "\n" +
                "    // Represents when O wins\n" +
                "    bp.registerBThread(\"DetectOWin(<\" + l[p[0]].x + \",\" + l[p[0]].y + \">,\" + \"<\" + l[p[1]].x + \",\" + l[p[1]].y + \">,\" + \"<\" + l[p[2]].x + \",\" + l[p[2]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('O',{_row:l[p[0]].x, _col:l[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('O',{_row:l[p[1]].x, _col:l[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('O',{_row:l[p[2]].x, _col:l[p[2]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('OWin') ] }, 100);\n" +
                "\n" +
                "        }\n" +
                "    });\n" +
                "\n" +
                "    // Player O strategy to add a the third O to win\n" +
                "    bp.registerBThread(\"AddThirdO(<\" + l[p[0]].x + \",\" + l[p[0]].y + \">,\" + \"<\" + l[p[1]].x + \",\" + l[p[1]].y + \">,\" + \"<\" + l[p[2]].x + \",\" + l[p[2]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('O',{_row:l[p[0]].x, _col:l[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('O',{_row:l[p[1]].x, _col:l[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:l[p[2]].x, _col:l[p[2]].y}) ] }, 50);\n" +
                "        }\n" +
                "    });\n" +
                "\n" +
                "    // Player O strategy to prevent the third X of player X\n" +
                "    bp.registerBThread(\"PreventThirdX(<\" + l[p[0]].x + \",\" + l[p[0]].y + \">,\" + \"<\" + l[p[1]].x + \",\" + l[p[1]].y + \">,\" + \"<\" + l[p[2]].x + \",\" + l[p[2]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:l[p[0]].x, _col:l[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:l[p[1]].x, _col:l[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:l[p[2]].x, _col:l[p[2]].y}) ] }, 40);\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "// Player O strategy:\n" +
                "\n" +
                "var lines = [ [ { x:0, y:0 }, { x:0, y:1 }, { x:0, y:2 } ],\n" +
                "    [ { x:1, y:0 }, { x:1, y:1 }, { x:1, y:2 } ],\n" +
                "    [ { x:2, y:0 }, { x:2, y:1 }, { x:2, y:2 } ],\n" +
                "    [ { x:0, y:0 }, { x:1, y:0 }, { x:2, y:0 } ],\n" +
                "    [ { x:0, y:1 }, { x:1, y:1 }, { x:2, y:1 } ],\n" +
                "    [ { x:0, y:2 }, { x:1, y:2 }, { x:2, y:2 } ],\n" +
                "    [ { x:0, y:0 }, { x:1, y:1 }, { x:2, y:2 } ],\n" +
                "    [ { x:0, y:2 }, { x:1, y:1 }, { x:2, y:0 } ] ];\n" +
                "var perms = [ [ 0, 1, 2 ], [ 0, 2, 1 ], [ 1, 0, 2 ],\n" +
                "    [ 1, 2, 0 ], [ 2, 0, 1 ], [ 2, 1, 0 ] ];\n" +
                "\n" +
                "lines.forEach(function(l) {\n" +
                "    perms.forEach(function(p) {\n" +
                "        addLinePermutationBthreads(l, p);\n" +
                "    });\n" +
                "});\n" +
                "\n" +
                "function addFork22PermutationBthreads(f, p) {\n" +
                "\n" +
                "    // Player O strategy to prevent the Fork22 of player X\n" +
                "    bp.registerBThread(\"PreventFork22X(<\" + f[p[0]].x + \",\" + f[p[0]].y + \">,\" + \"<\" + f[p[1]].x + \",\" + f[p[1]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[0]].x, _col:f[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[1]].x, _col:f[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:2, _col:2}),bp.Event('O',{_row:0, _col:2}),\n" +
                "                    bp.Event('O',{_row:2, _col:0})] }, 30);\n" +
                "//\t\t\tbp.sync({ block:[ O(0,0), O(0,1), O(1,0) ] },30); // Problematic - stays all the time\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "function addFork02PermutationBthreads(f, p) {\n" +
                "    // Player O strategy to prevent the Fork02 of player X\n" +
                "    bp.registerBThread(\"PreventFork02X(<\" + f[p[0]].x + \",\" + f[p[0]].y + \">,\" + \"<\" + f[p[1]].x + \",\" + f[p[1]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[0]].x, _col:f[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[1]].x, _col:f[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:0, _col:2}),bp.Event('O',{_row:0, _col:0}),\n" +
                "                    bp.Event('O',{_row:2, _col:2})] }, 30);\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "function addFork20PermutationBthreads(f, p) {\n" +
                "    // Player O strategy to prevent the Fork20 of player X\n" +
                "    bp.registerBThread(\"PreventFork20X(<\" + f[p[0]].x + \",\" + f[p[0]].y + \">,\" + \"<\" + f[p[1]].x + \",\" + f[p[1]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[0]].x, _col:f[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[1]].x, _col:f[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:2, _col:0}),bp.Event('O',{_row:0, _col:0}),\n" +
                "                    bp.Event('O',{_row:2, _col:2})] }, 30);\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "function addFork00PermutationBthreads(f, p) {\n" +
                "    // Player O strategy to prevent the Fork00 of player X\n" +
                "    bp.registerBThread(\"PreventFork00X(<\" + f[p[0]].x + \",\" + f[p[0]].y + \">,\" + \"<\" + f[p[1]].x + \",\" + f[p[1]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[0]].x, _col:f[p[0]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[1]].x, _col:f[p[1]].y}) ] });\n" +
                "\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:0, _col:0}),bp.Event('O',{_row:0, _col:2}),\n" +
                "                    bp.Event('O',{_row:2, _col:0})] }, 30);\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "function addForkdiagPermutationBthreads(f, p) {\n" +
                "    // Player O strategy to prevent the Forkdiagonal of player X\n" +
                "    bp.registerBThread(\"PreventForkdiagX(<\" + f[p[0]].x + \",\" + f[p[0]].y + \">,\" + \"<\" + f[p[1]].x + \",\" + f[p[1]].y + \">)\", function() {\n" +
                "        while (true) {\n" +
                "            bp.sync({ waitFor:[bp.Event('X',{_row:f[p[0]].x, _col:f[p[0]].y})] });\n" +
                "            bp.sync({ waitFor:[ bp.Event('X',{_row:f[p[1]].x, _col:f[p[1]].y}) ] });\n" +
                "            bp.sync({ request:[ bp.Event('O',{_row:0, _col:1}),bp.Event('O',{_row:1, _col:0}),\n" +
                "                    bp.Event('O',{_row:2, _col:1}), bp.Event('O',{_row:1, _col:2}) ] }, 30);\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "var forks22 = [ [ { x:1, y:2 }, { x:2, y:0 } ], [ { x:2, y:1 }, { x:0, y:2 } ], [ { x:1, y:2 }, { x:2, y:1 } ] ];\n" +
                "var forks02 = [ [ { x:1, y:2 }, { x:0, y:0 } ], [ { x:0, y:1 }, { x:2, y:2 } ], [ { x:1, y:2 }, { x:0, y:1 } ] ];\n" +
                "var forks20 = [ [ { x:1, y:0 }, { x:2, y:2 } ], [ { x:2, y:1 }, { x:0, y:0 } ], [ { x:2, y:1 }, { x:1, y:0 } ] ];\n" +
                "var forks00 = [ [ { x:0, y:1 }, { x:2, y:0 } ], [ { x:1, y:0 }, { x:0, y:2 } ], [ { x:0, y:1 }, { x:1, y:0 } ] ];\n" +
                "\n" +
                "var forksdiag = [ [ { x:0, y:2 }, { x:2, y:0 } ]\n" +
                "    //,[ { x:0, y:0 },{ x:2, y:2 }] // <--- Intentional BUG\n" +
                "];\n" +
                "\n" +
                "var permsforks = [ [ 0, 1 ], [ 1, 0 ] ];\n" +
                "\n" +
                "forks22.forEach(function(f) {\n" +
                "    permsforks.forEach(function(p) {\n" +
                "        addFork22PermutationBthreads(f, p);\n" +
                "    });\n" +
                "});\n" +
                "\n" +
                "forks02.forEach(function(f) {\n" +
                "    permsforks.forEach(function(p) {\n" +
                "        addFork02PermutationBthreads(f, p);\n" +
                "    });\n" +
                "});\n" +
                "\n" +
                "forks20.forEach(function(f) {\n" +
                "    permsforks.forEach(function(p) {\n" +
                "        addFork20PermutationBthreads(f, p);\n" +
                "    });\n" +
                "});\n" +
                "\n" +
                "forks00.forEach(function(f) {\n" +
                "    permsforks.forEach(function(p) {\n" +
                "        addFork00PermutationBthreads(f, p);\n" +
                "    });\n" +
                "});\n" +
                "\n" +
                "forksdiag.forEach(function(f) {\n" +
                "    permsforks.forEach(function(p) {\n" +
                "        addForkdiagPermutationBthreads(f, p);\n" +
                "    });\n" +
                "});\n" +
                "\n" +
                "// Preference to put O on the center\n" +
                "\n" +
                "bp.registerBThread(\"Center\", function() {\n" +
                "    while (true) {\n" +
                "        bp.sync({ request:[ bp.Event('O',{_row:1, _col:1}) ] }, 35);\n" +
                "    }\n" +
                "});\n" +
                "\n" +
                "// Preference to put O on the corners\n" +
                "bp.registerBThread(\"Corners\", function() {\n" +
                "    while (true) {\n" +
                "        bp.sync({ request:[ bp.Event('O',{_row:0, _col:0}),bp.Event('O',{_row:0, _col:2}),\n" +
                "                bp.Event('O',{_row:2, _col:0}), bp.Event('O',{_row:2, _col:2}) ] }, 20);\n" +
                "\n" +
                "    }\n" +
                "});\n" +
                "\n" +
                "// Preference to put O on the sides\n" +
                "bp.registerBThread(\"Sides\", function() {\n" +
                "bp.sync({request: bp.Event('Click',{ _row:0, _col:0})});"+
                "    while (true) {\n" +
                "        bp.sync({ request:[ bp.Event('O',{_row:0, _col:1}),bp.Event('O',{_row:1, _col:0}),\n" +
                "                bp.Event('O',{_row:2, _col:1}), bp.Event('O',{_row:1, _col:2}) ] }, 10);\n" +
                "    }\n" +
                "});" ;



		// Stop the current deployment
		if (thread != null)
			thread.interrupt();

		// Start a new deployment
		bprog = new StringBProgram(s);

        bprog.setEventSelectionStrategy(new PrioritizedBSyncEventSelectionStrategy());
        //bprog.setWaitForExternalEvents(true);

		bprog.setDaemonMode(true);

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