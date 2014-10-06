package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.Session;

public final class MessageHandler
{
	private Map<String, Message> messageTypes = Collections
			.synchronizedMap(new HashMap<String, Message>());
	
	public MessageHandler(Message... messages)
	{
		for (Message message : messages)
		{
			messageTypes.put(message.getMessage(), message);
		}
	}
	
	public void handle(Session session, ServerCommunicationModel msg)
	{
		Object data = msg.getData();
		Message message = messageTypes.get(msg.getMessage());
		if (message != null)
		{
			message.run(session, data);
		}
	}
	
	public void onOpen(Session session)
	{
		ServerCommunicationModel clientMessage = new ServerCommunicationModel(null, "client-create");
		handle(session, clientMessage);
	}
	
	public void onClose(Session session)
	{
		removeClient(session);
	}
	
	public void onError(Session session)
	{
		removeClient(session);
	}
	
	public void removeClient(Session session)
	{
		ServerCommunicationModel clientMessage = new ServerCommunicationModel(null, "client-remove");
		handle(session, clientMessage);
	}
}
