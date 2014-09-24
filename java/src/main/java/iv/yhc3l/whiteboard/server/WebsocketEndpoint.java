package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.ServerCommunicationModelDecoder;
import iv.yhc3l.whiteboard.encoders.ServerCommunicationModelEncoder;
import iv.yhc3l.whiteboard.models.PositionModel;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.models.WhiteboardObjectModel;
import iv.yhc3l.whiteboard.repository.dao.inmemory.WhiteboardDao;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import java.util.Date;

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
public class WebsocketEndpoint
{
	private static final WhiteboardDao wbd = new WhiteboardDao();
	public static final WhiteboardService whiteboardRepository = new WhiteboardService(wbd);
	public static final PostItService postItRepository = new PostItService(wbd);
	
	@OnOpen
	public void myOnOpen(Session session)
	{
		for (Session ses : session.getOpenSessions())
		{
			ServerCommunicationModel message = new ServerCommunicationModel(
					new WhiteboardObjectModel(), session.getOpenSessions().size() + "");
			ses.getAsyncRemote().sendObject(message);
		}
	}
	
	@OnMessage
	public void myOnMessage(Session session, ServerCommunicationModel msg)
	{
		PostItModel postit = new PostItModel(0, 1, "isak", "kebabi", "in progress",
				new PositionModel(2, 1), false, "hello");
		ServerCommunicationModel model = new ServerCommunicationModel(
				new PostItModel(postit.getId(), postit.getWhiteboardId(), postit.getAuthor(),
						postit.getText(), postit.getStatus(), postit.getPosition(),
						postit.isRemoved(), new Date().toString()), msg.getMessage());
		session.getAsyncRemote().sendObject(model);
	}
	
	@OnClose
	public void myOnClose(Session session, CloseReason reason)
	{	
		
	}
	
	@OnError
	public void myOnError(Session session, Throwable throwable)
	{	
		
	}
	
	public void create(Session session, PostItModel msg)
	{}
}
