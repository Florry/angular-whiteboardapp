package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.ServerCommunicationModelDecoder;
import iv.yhc3l.whiteboard.encoders.ServerCommunicationModelEncoder;
import iv.yhc3l.whiteboard.message.Create;
import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.message.MessageHandler;
import iv.yhc3l.whiteboard.message.Remove;
import iv.yhc3l.whiteboard.message.Update;
import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ConnectionsModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.models.WhiteboardModel;

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
	private static MessageHandler messageHandler = new MessageHandler(new Create(), new Update(),
			new Remove());
	private static boolean once = true;
	
	@OnOpen
	public void whiteboardOnOpen(Session session)
	{
		{// DEBUG
			if (once)
			{
				once = false;
				WhiteboardModel whiteboard = new WhiteboardModel(-1, "bob");
				WhiteboardModel whiteboard2 = new WhiteboardModel(-1, "bob2");
				Message.whiteboardRepository.createWhiteboard(whiteboard);
				Message.whiteboardRepository.createWhiteboard(whiteboard2);
			}
		}// DEBUG END
		
		ServerCommunicationModel message = new ServerCommunicationModel(new ConnectionsModel(
				session.getOpenSessions().size()), "connections");
		MessageUtils.sendMessageToAll(session, message, true);
		
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
	}
	
	@OnError
	public void whiteboardOnError(Session session, Throwable throwable)
	{
		System.err.println(throwable.getLocalizedMessage());
	}
	
}
