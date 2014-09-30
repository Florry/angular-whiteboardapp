package iv.yhc3l.whiteboard.message.utils;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.Session;

public final class Remove extends Message
{
	public Remove()
	{
		this.message = "postit-remove";
	}
	
	@Override
	public void run(Session session, PostItModel postIt)
	{
		postItRepository.removePostIt(postIt);
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-deleted");
		MessageUtils.sendMessageToAll(session, response, false);
	}
	
}
