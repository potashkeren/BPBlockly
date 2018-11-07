package bpserver.bgu.ac.il;

import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListenerAdapter;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.util.log.Logger;
import org.json.*;
import javax.websocket.*;

public class EventQueue extends Endpoint implements MessageHandler.Whole<String> {
    private static final Logger LOG = Log.getLogger(EventQueue.class);

    private RemoteEndpoint.Async remote;

    @Override
    public void onClose(Session session, CloseReason close) {
        super.onClose(session, close);
        this.remote = null;
        LOG.info("WebSocket Close: {} - {}", close.getCloseCode(), close.getReasonPhrase());
    }

    public void onOpen(Session session, EndpointConfig config) {
        this.remote = session.getAsyncRemote();
        LOG.info("WebSocket Connect: {}", session);

        // Attach this as a message handler
        session.addMessageHandler(this);

        // Start reporting BP events
        if (RunServlet.rnr != null) {
            RunServlet.rnr.addListener(new BProgramRunnerListenerAdapter() {
                public void eventSelected(BProgram bp, BEvent event) {
                    if (remote != null) {
                        LOG.info("Sending:" + event.name);
                        remote.sendText(event.name);
                    }
                }

            });
        }
    }


    public void onMessage(String message) {
        LOG.info("Enquing external event {}", message);

        try {
            final JSONObject obj = new JSONObject(message);

            String name = obj.getString("name");
            Object data = obj.getJSONObject("data");

            if (RunServlet.bprog != null) {
                RunServlet.bprog.enqueueExternalEvent(new BEvent(name,data));
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}