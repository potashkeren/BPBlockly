package il.ac.bgu.bp.cotextualBlockly.context;

public class SimulatedTimeInjector extends TimeInjector{
    private final long initTime;
    private int minutesCounter = 0;
    private int simulationMinutedInMilliseconds;

    public SimulatedTimeInjector(long initTime, int simulationMinutedInMilliseconds) {
        super();
        this.initTime = initTime;
        this.simulationMinutedInMilliseconds = simulationMinutedInMilliseconds;
    }

    @Override
    protected long getTime() {
        return initTime + minutesCounter * 1000 * 60;
    }

    @Override
    protected void sleep() throws InterruptedException {
        Thread.sleep(simulationMinutedInMilliseconds);
        minutesCounter++;
    }
}
