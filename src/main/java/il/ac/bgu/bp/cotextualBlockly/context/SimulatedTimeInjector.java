package il.ac.bgu.bp.cotextualBlockly.context;

import il.ac.bgu.bp.cotextualBlockly.ContextInstance;

import java.time.LocalDateTime;

public class SimulatedTimeInjector extends TimeInjector{
    private final LocalDateTime initTime;
    private int minutesCounter = 0;
    private int simulationMinutedInMilliseconds;

    public SimulatedTimeInjector(LocalDateTime initTime, int simulationMinutedInMilliseconds, ContextInstance... contextInstance) {
        super(contextInstance);
        this.initTime = initTime;
        this.simulationMinutedInMilliseconds = simulationMinutedInMilliseconds;
    }

    @Override
    protected LocalDateTime getTime() {
        return initTime.plusMinutes(minutesCounter);
    }

    @Override
    protected void sleep() throws InterruptedException {
        Thread.sleep(simulationMinutedInMilliseconds);
        minutesCounter++;
        // System.out.println(getTime().toString());
        TimeInjector.time.set(getTime());
    }
}
