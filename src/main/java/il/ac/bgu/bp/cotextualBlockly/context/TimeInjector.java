package il.ac.bgu.bp.cotextualBlockly.context;

import il.ac.bgu.bp.cotextualBlockly.RunServlet;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicReference;

public class TimeInjector implements Runnable {
    protected static AtomicReference<String> time = new AtomicReference<String>("current_timestamp");

    public static String getCurrentTime() {
        return  time.get();
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
            RunServlet.pushToExternal(new BEvent("Time", t));
            try {
                sleep();
            } catch (InterruptedException e) {
                stop();
            }
        }
    }
}
