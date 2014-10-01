package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

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
		
		ServerCommunicationModel response = new ServerCommunicationModel(client, "client-added");
		MessageUtils.sendMessage(client.getSession(), response);
	}
}
