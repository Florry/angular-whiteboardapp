package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.ConnectionsModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

import javax.websocket.Session;

public class Connections extends Message
{
	public Connections()
	{
		this.message = "connections-new";
	}
	
	@Override
	public void run(Session session, Object data)
	{
		Utils.println(this);
		
		ClientModel client = (ClientModel) data;
		int openSessionsOnBoard = getSessionCount(client);
		
		ConnectionsModel connectionsModel = new ConnectionsModel(openSessionsOnBoard);
		ServerCommunicationModel connectionResponse = new ServerCommunicationModel(
				connectionsModel, "connections-new");
		
		for (ClientModel clientModel : clientRepository.getAllClients().values())
		{
			if (clientModel.getSession().isOpen())
			{
				System.out.println(clientModel.getWhiteboardId() + " " + client.getWhiteboardId());
				if (clientModel.getWhiteboardId() == client.getWhiteboardId())
				{
					MessageUtils.sendMessage(clientModel.getSession(), connectionResponse);
				}
			}
		}
	}
	
	private int getSessionCount(ClientModel client)
	{
		int openSessionsOnBoard = 0;
		for (ClientModel clientModel : clientRepository.getAllClients().values())
		{
			if (clientModel.getWhiteboardId() == client.getWhiteboardId())
			{
				if (clientModel.getSession().isOpen())
				{
					openSessionsOnBoard += 1;
				}
			}
		}
		return openSessionsOnBoard;
	}
}