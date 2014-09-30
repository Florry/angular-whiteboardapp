package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.Session;

public class Update extends Message
{
	public Update()
	{
		this.message = "postit-update";
	}
	
	@Override
	public void run(Session session, PostItModel postIt)
	{
		postItRepository.updatePostIt(postIt);
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-updated");
		MessageUtils.sendMessageToAll(session, response, false);
	}
	
}
