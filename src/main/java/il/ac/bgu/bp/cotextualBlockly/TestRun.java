package il.ac.bgu.bp.cotextualBlockly;

import il.ac.bgu.bp.cotextualBlockly.context.SimulatedTimeInjector;
import il.ac.bgu.bp.cotextualBlockly.context.TimeInjector;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListenerAdapter;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;

import java.time.LocalDateTime;

public class TestRun {
  private static ContextInstance server = new ContextInstance("Server.js","Server_init.js", "db_population.js","Simulation.js");

  private static Thread timeInjectorThread;
  private static TimeInjector timeInjector;

  public static void main(String[] args) throws Exception {
    server.reset();

//      Thread.sleep(4000);
//      ContextService.getContextInstances("Cell", Cell.class)
//              .forEach(cell -> bprog.enqueueExternalEvent(new BEvent("Click",cell)));


    try { Thread.sleep(2000); } catch (InterruptedException e) { }
    LocalDateTime a=LocalDateTime.now();
    LocalDateTime rightNow = LocalDateTime.of(a.getYear(),a.getMonth(),a.getDayOfMonth(),a.getHour()-3,a.getMinute());
    System.out.println("current datetime : " + rightNow);
    timeInjector = new SimulatedTimeInjector(rightNow,50,new ContextInstance[]{server});
    timeInjectorThread = new Thread(timeInjector);
    timeInjectorThread.run();


  }
}
