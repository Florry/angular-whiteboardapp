package iv.yhc3l.whiteboard.message.postit;

import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

import javax.websocket.Session;

public final class CreatePostIt extends Message
{
	public CreatePostIt()
	{
		this.message = "postit-create";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		Utils.println(this);
		
		PostItModel postIt = new PostItModel((PostItModel) data);
		postIt = new PostItModel(postItRepository.createPostIt(postIt));
		
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-created");
		MessageUtils.sendPostItMessageToBoard(session, clientRepository.getAllClients(), response,
				true);
	}
}
