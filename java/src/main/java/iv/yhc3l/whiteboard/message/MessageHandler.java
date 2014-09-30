package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.Session;

public final class MessageHandler
{
	private List<Message> messageTypes = new ArrayList<Message>();
	
	public MessageHandler(Message... messages)
	{
		for (Message message : messages)
		{
			messageTypes.add(message);
		}
	}
	
	public void handle(Session session, ServerCommunicationModel msg)
	{
		PostItModel postIt = new PostItModel((PostItModel) msg.getData());
		for (Message message : messageTypes)
		{
			if (message.getMessage().equals(msg.getMessage()))
			{
				message.run(session, postIt);
			}
		}
	}
}
