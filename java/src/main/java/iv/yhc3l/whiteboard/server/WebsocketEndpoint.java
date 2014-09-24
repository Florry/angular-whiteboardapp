package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.PostItDecoder;
import iv.yhc3l.whiteboard.encoders.PostItEncoder;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.repository.dao.inmemory.WhiteboardDao;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/whiteboard", decoders =
{ PostItDecoder.class }, encoders =
{ PostItEncoder.class })
public class WebsocketEndpoint
{
	private static final WhiteboardDao wbd = new WhiteboardDao();
	public static WhiteboardService whiteboardRepository = new WhiteboardService(wbd);
	public static PostItService postItRepository = new PostItService(wbd);
	
	@OnOpen
	public void myOnOpen(Session session)
	{
		System.out.println("Connection opened");
	}
	
	@OnMessage
	public void myOnMessage(Session session, PostItModel msg)
	{
		System.out.println("Message recieved");
	}
	
	@OnClose
	public void myOnClose(Session session, CloseReason reason)
	{
		System.out.println("Connection closed");
	}
	
	@OnError
	public void myOnError(Session session, Throwable throwable)
	{
		System.out.println("Connectionb dropped");
	}
	
}
