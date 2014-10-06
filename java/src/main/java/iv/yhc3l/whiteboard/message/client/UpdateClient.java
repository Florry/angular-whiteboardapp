package iv.yhc3l.whiteboard.message.client;

import iv.yhc3l.whiteboard.message.Message;
import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ClientMessageModel;
import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.server.WebsocketEndpoint;
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
		
		if (whiteboardRepository.getWhiteboard(message.getWhiteboardId()) != null)
		{
			ClientModel oldClient = new ClientModel(session);
			oldClient
					.setWhiteboardId(clientRepository.getClient(session.getId()).getWhiteboardId());
			
			ClientModel client = new ClientModel(session);
			client.setWhiteboardId(((ClientMessageModel) data).getWhiteboardId());
			clientRepository.updateClient(client);
			
			ServerCommunicationModel response = new ServerCommunicationModel(client,
					"client-updated");
			MessageUtils.sendMessage(client.getSession(), response);
			
			ServerCommunicationModel response2 = new ServerCommunicationModel(oldClient,
					"connections-new");
			
			// TODO - FIXA
			WebsocketEndpoint.getMessageHandler().handle(session, response2);
		}
	}
	
}