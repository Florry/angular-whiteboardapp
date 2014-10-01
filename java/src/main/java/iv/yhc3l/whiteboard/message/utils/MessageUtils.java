package iv.yhc3l.whiteboard.message.utils;

import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import java.util.Map;

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
	
	public static void sendPostItMessageToBoard(Session session, Map<String, ClientModel> clients,
			Object message, boolean sendToInstigator)
	{
		ServerCommunicationModel serverCommunicationModel = new ServerCommunicationModel(
				(ServerCommunicationModel) message);
		PostItModel postIt = new PostItModel((PostItModel) serverCommunicationModel.getData());
		
		for (ClientModel client : clients.values())
		{
			if (client.getSession().isOpen()
					&& (sendToInstigator ? true : !client.getSession().getId()
							.equals(session.getId())))
			{
				if (client.getWhiteboardId() == postIt.getWhiteboardId())
				{
					client.getSession().getAsyncRemote().sendObject(message);
				}
			}
		}
		
	}
	
	public static void sendMessage(Session session, Object data)
	{
		session.getAsyncRemote().sendObject(data);
	}
}
