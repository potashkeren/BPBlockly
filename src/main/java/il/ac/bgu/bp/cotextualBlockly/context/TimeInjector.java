package il.ac.bgu.bp.cotextualBlockly.context;

import il.ac.bgu.bp.cotextualBlockly.RunServlet;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

public class TimeInjector implements Runnable {
//    public static EventSet get

    @Override
    public void run() {
        while (true) {
            long t = System.currentTimeMillis();
            Timestamp now = new Timestamp(t-t%(60*1000));

            Map<String, Object> params = new HashMap<String, Object>() {{
               put("timestamp", now);
            }};
            RunServlet.pushToExternal(new BEvent("Time", params));
            try {
                Thread.sleep(1000*60);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
