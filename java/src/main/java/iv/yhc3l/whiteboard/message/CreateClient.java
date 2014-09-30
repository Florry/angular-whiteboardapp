package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ClientModel;

import javax.websocket.Session;

public class CreateClient extends Message
{
	public CreateClient()
	{
		this.message = "client-create";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		ClientModel client = new ClientModel(session);
		clientRepository.addClient(client);
		MessageUtils.sendMessage(client.getSession(), client);
	}
}
