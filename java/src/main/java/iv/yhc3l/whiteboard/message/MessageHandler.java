package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.websocket.Session;

public final class MessageHandler
{
	private List<Message> messageTypes = Collections.synchronizedList(new ArrayList<Message>());
	
	public MessageHandler(Message... messages)
	{
		for (Message message : messages)
		{
			messageTypes.add(message);
		}
	}
	
	public void handle(Session session, ServerCommunicationModel msg)
	{
		Object data = msg.getData();
		for (Message message : messageTypes)
		{
			if (message.getMessage().equals(msg.getMessage()))
			{
				message.run(session, data);
			}
		}
	}
}
