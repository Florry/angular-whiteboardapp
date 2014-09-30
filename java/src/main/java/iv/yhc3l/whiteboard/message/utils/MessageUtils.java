package iv.yhc3l.whiteboard.message.utils;

import javax.websocket.Session;

public final class MessageUtils
{
	public static void sendMessageToAll(Session session, Object message, boolean sendToInstigator)
	{
		for (Session sess : session.getOpenSessions())
		{
			if (sess.isOpen() && (sendToInstigator ? true : !sess.getId().equals(session.getId())))
			{
				sess.getAsyncRemote().sendObject(message);
			}
		}
	}
	
	public static void sendMessage(Session session, Object data)
	{
		session.getAsyncRemote().sendObject(data);
		
	}
}
