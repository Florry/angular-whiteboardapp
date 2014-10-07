package iv.yhc3l.whiteboard.message.postit;

import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

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
			Utils.println(this);
			PostItModel postIt = new PostItModel((PostItModel) data);
			postItRepository.removePostIt(postIt);
			
			ServerCommunicationModel response = new ServerCommunicationModel(postIt,
					"postit-removed");
			MessageUtils.sendPostItMessageToBoard(session, clientRepository.getAllClients(),
					response, false);
		}
	}
	
}
