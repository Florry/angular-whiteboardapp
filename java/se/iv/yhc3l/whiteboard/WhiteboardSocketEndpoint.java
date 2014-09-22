package se.iv.yhc3l.whiteboard;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import se.florry.yhc3l.websockets.ChatMessage;
import se.florry.yhc3l.websockets.ChatMessageTextDecoder;
import se.florry.yhc3l.websockets.ChatMessageTextEncoder;

@ServerEndpoint(value = "/whiteboard")
public class WhiteboardSocketEndpoint
{	
	@OnOpen
	public void myOnOpen(Session session)
	{}
	
	@OnMessage
	public void myOnMessage(Session session, ChatMessage msg)
	{}
	
	@OnClose
	public void myOnClose(Session session, CloseReason reason)
	{}
	
	@OnError
	public void myOnError(Session session, Throwable throwable)
	{}
	
}
