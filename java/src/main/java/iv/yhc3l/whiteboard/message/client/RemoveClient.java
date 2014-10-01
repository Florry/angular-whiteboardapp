package iv.yhc3l.whiteboard.message.client;

import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.Session;

public class RemoveClient extends Message
{
	public RemoveClient()
	{
		this.message = "client-remove";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		ClientModel client = new ClientModel(session);
		clientRepository.removeClient(client);
		
		ServerCommunicationModel response = new ServerCommunicationModel(client, "client-removed");
		MessageUtils.sendMessage(client.getSession(), response);
	}
}
