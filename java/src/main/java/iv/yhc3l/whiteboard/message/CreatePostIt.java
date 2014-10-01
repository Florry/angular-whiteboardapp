package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

import javax.websocket.Session;

public class CreatePostIt extends Message
{
	public CreatePostIt()
	{
		this.message = "postit-create";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		if (data instanceof PostItModel)
		{
			Utils.println(this);
			PostItModel postIt = new PostItModel((PostItModel) data);
			postItRepository.createPostIt(postIt);
			ServerCommunicationModel response = new ServerCommunicationModel(postIt,
					"postit-created");
			MessageUtils.sendMessageToAll(session, response, false);
		}
	}
}
