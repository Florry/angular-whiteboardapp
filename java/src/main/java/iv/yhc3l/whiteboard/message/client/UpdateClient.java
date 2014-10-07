package iv.yhc3l.whiteboard.message.client;

import iv.yhc3l.whiteboard.app.App;
import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.models.ClientMessageModel;
import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

import javax.websocket.Session;

public final class UpdateClient extends Message
{
	public UpdateClient()
	{
		this.message = "client-update";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		Utils.println(this);
		ClientMessageModel message = (ClientMessageModel) data;
		
		ClientModel oldClient = clientRepository.getClient(session.getId());
		ClientModel client = new ClientModel(session);
		
		client = new ClientModel(client, message.getWhiteboardId());
		clientRepository.updateClient(client);
		
		ServerCommunicationModel response2 = new ServerCommunicationModel(oldClient,
				"connections-new");
		App.messageHandler.handle(session, response2);
	}
}
