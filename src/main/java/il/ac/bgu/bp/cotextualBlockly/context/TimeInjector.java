package il.ac.bgu.bp.cotextualBlockly.context;

import il.ac.bgu.bp.cotextualBlockly.ContextInstance;
import il.ac.bgu.bp.cotextualBlockly.RunServlet;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.concurrent.atomic.AtomicReference;

public class TimeInjector implements Runnable {
    protected static AtomicReference<LocalDateTime> time = new AtomicReference<LocalDateTime>(LocalDateTime.now());

    private ContextInstance[] contextInstance;

    public static LocalDateTime getCurrentTime() {
        return  time.get();
    }

    public TimeInjector(ContextInstance ... contextInstance) {
        this.contextInstance = contextInstance;
    }

    private boolean stop = false;

    protected LocalDateTime getTime() {
        return LocalDateTime.now();
    }

    protected void sleep() throws InterruptedException {
        Thread.sleep(1000 * 60);
    }

    public final void stop() {
        stop = true;
    }

    @Override
    public void run() {
        while (!stop) {
            LocalDateTime t = getTime();
            Arrays.asList(contextInstance).forEach(i -> i.pushToExternal(new BEvent("Time", t)));
            try {
                sleep();
            } catch (InterruptedException e) {
                stop();
            }
        }
    }
}
