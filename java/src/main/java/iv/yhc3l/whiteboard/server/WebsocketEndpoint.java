package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.app.App;
import iv.yhc3l.whiteboard.decoders.ServerCommunicationModelDecoder;
import iv.yhc3l.whiteboard.encoders.ServerCommunicationModelEncoder;
import iv.yhc3l.whiteboard.message.MessageHandler;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/whiteboard", decoders =
{ ServerCommunicationModelDecoder.class }, encoders =
{ ServerCommunicationModelEncoder.class })
public final class WebsocketEndpoint
{
	private static MessageHandler messageHandler = App.messageHandler;
	
	private static boolean once = true;
	
	@OnOpen
	public void whiteboardOnOpen(Session session)
	{
		messageHandler.onOpen(session);
	}
	
	@OnMessage
	public void whiteboardOnMessage(Session session, ServerCommunicationModel msg)
	{
		messageHandler.handle(session, msg);
	}
	
	@OnClose
	public void whiteboardOnClose(Session session, CloseReason reason)
	{
		System.out.println("Session: " + session.getId() + " disconnected, reason: "
				+ reason.getReasonPhrase());
		messageHandler.onClose(session);
	}
	
	@OnError
	public void whiteboardOnError(Session session, Throwable throwable)
	{
		System.err.println(throwable.getLocalizedMessage());
		messageHandler.onError(session);
	}
	
	public static MessageHandler getMessageHandler()
	{
		return messageHandler;
	}
	
}
