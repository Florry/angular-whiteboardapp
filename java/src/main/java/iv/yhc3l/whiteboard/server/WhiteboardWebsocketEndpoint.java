package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.PostItDecoder;
import iv.yhc3l.whiteboard.encoders.PostItEncoder;
import iv.yhc3l.whiteboard.models.PostItModel;

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
public class WhiteboardWebsocketEndpoint
{
	@OnOpen
	public void myOnOpen(Session session)
	{}
	
	@OnMessage
	public void myOnMessage(Session session, PostItModel msg)
	{
		PostItModel postit = new PostItModel(msg.getId() + 1, msg.getWhiteboardId() + 1, "kebab",
				"kebab is all about kebab", "done", msg.getPosition(), false);
		
		session.getAsyncRemote().sendObject(postit);
	}
	
	@OnClose
	public void myOnClose(Session session, CloseReason reason)
	{}
	
	@OnError
	public void myOnError(Session session, Throwable throwable)
	{}
	
}
