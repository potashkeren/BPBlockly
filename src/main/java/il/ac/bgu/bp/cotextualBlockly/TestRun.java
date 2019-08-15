package il.ac.bgu.bp.cotextualBlockly;

import il.ac.bgu.bp.cotextualBlockly.context.SimulatedTimeInjector;
import il.ac.bgu.bp.cotextualBlockly.context.TimeInjector;

import java.time.LocalDateTime;

public class TestRun {
  private static ContextInstance server = new ContextInstance("Server.js","Server_init.js", "db_population.js","SimulationEngine.js", "AcceptanceTests_Sequential.js");

  private static Thread timeInjectorThread;
  private static TimeInjector timeInjector;

  public static void main(String[] args) throws Exception {
    server.reset();

    try { Thread.sleep(2000); } catch (InterruptedException e) { }
    LocalDateTime a=LocalDateTime.now();
    LocalDateTime rightNow = LocalDateTime.of(a.getYear(),a.getMonth(),a.getDayOfMonth(),a.getHour()-3,a.getMinute());
    System.out.println("current datetime : " + rightNow);
    timeInjector = new SimulatedTimeInjector(rightNow,50,new ContextInstance[]{server});
    timeInjectorThread = new Thread(timeInjector);
    timeInjectorThread.run();


  }
}
