package il.ac.bgu.bp.cotextualBlockly.context;

import il.ac.bgu.bp.cotextualBlockly.RunServlet;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import java.sql.Timestamp;

public class TimeInjector implements Runnable {
//    public static EventSet get

    @Override
    public void run() {
        while (true) {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            //Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this Timestamp object
            long timeInMilliseconds = now.getTime();
            long timeInMinutes = timeInMilliseconds/(60*1000);

            RunServlet.pushToExternal(new BEvent("Time", timeInMinutes));
            try {
                Thread.sleep(1000*60);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
