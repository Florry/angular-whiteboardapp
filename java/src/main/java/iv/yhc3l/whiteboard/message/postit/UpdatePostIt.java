package iv.yhc3l.whiteboard.message.postit;

import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.Session;

public final class UpdatePostIt extends Message
{
	public UpdatePostIt()
	{
		this.message = "postit-update";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		if (data instanceof PostItModel)
		{
			PostItModel postIt = new PostItModel((PostItModel) data);
			postItRepository.updatePostIt(postIt);
			
			ServerCommunicationModel response = new ServerCommunicationModel(postIt,
					"postit-updated");
			MessageUtils.sendPostItMessageToBoard(session, clientRepository.getAllClients(),
					response, false);
		}
	}
	
}