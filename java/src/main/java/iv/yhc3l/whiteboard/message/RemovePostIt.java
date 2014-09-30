package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.Session;

public final class RemovePostIt extends Message
{
	public RemovePostIt()
	{
		this.message = "postit-remove";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		if (data instanceof PostItModel)
		{
			PostItModel postIt = new PostItModel((PostItModel) data);
			postItRepository.removePostIt(postIt);
			ServerCommunicationModel response = new ServerCommunicationModel(postIt,
					"postit-deleted");
			MessageUtils.sendMessageToAll(session, response, false);
		}
	}
	
}
