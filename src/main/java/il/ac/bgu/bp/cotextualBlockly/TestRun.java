package il.ac.bgu.bp.cotextualBlockly;

import il.ac.bgu.bp.cotextualBlockly.context.SimulatedTimeInjector;
import il.ac.bgu.bp.cotextualBlockly.context.TimeInjector;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListenerAdapter;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;

import java.time.LocalDateTime;

public class TestRun {
  private static ContextInstance server = new ContextInstance("Server.js","Server_init.js", "db_population.js");
  private static ContextInstance simulation = new ContextInstance("Simulation.js", "db_population.js");

  private static Thread timeInjectorThread;
  private static TimeInjector timeInjector;

  public static void main(String[] args) throws Exception {
    server.reset();
    simulation.reset();
    simulation.addListener(new BProgramRunnerListenerAdapter() {
      @Override
      public void eventSelected(BProgram bp, BEvent theEvent) {
        if(theEvent.name.equals("Sensor")) {
          server.pushToExternal(theEvent);
        }
      }
    });
    try { Thread.sleep(2000); } catch (InterruptedException e) { }
    LocalDateTime a=LocalDateTime.now();
    LocalDateTime rightNow = LocalDateTime.of(a.getYear(),a.getMonth(),a.getDayOfMonth(),a.getHour()-3,a.getMinute());
    System.out.println("current datetime : " + rightNow);
    timeInjector = new SimulatedTimeInjector(rightNow,50,new ContextInstance[]{server, simulation});
    timeInjectorThread = new Thread(timeInjector);
    timeInjectorThread.run();
  }
}
