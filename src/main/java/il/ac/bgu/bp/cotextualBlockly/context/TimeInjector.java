package il.ac.bgu.bp.cotextualBlockly.context;

import il.ac.bgu.bp.cotextualBlockly.RunServlet;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

public class TimeInjector implements Runnable {
    private boolean stop = false;

    protected long getTime() {
        return System.currentTimeMillis();
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
            long t = getTime();
            Timestamp now = new Timestamp(t-t%(60*1000));
            RunServlet.pushToExternal(new BEvent("Time", now.toString()));
            try {
                sleep();
            } catch (InterruptedException e) {
                stop();
            }
        }
    }
}
