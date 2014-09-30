package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.Session;

public class Create extends Message
{
	public Create()
	{
		this.message = "postit-create";
	}
	
	@Override
	public void run(Session session, PostItModel postIt)
	{
		postItRepository.createPostIt(postIt);
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-created");
		MessageUtils.sendMessageToAll(session, response, false);
	}
}
