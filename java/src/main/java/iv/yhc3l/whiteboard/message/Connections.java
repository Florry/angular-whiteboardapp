package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.message.utils.MessageUtils;
import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.models.ConnectionsModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

import javax.websocket.Session;

public final class Connections extends Message
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
		
		int newWhiteboardId = new Integer(clientRepository.getClient(client.getId())
				.getWhiteboardId());
		int lastWhiteboardId = client.getWhiteboardId();
		
		System.out.println("LAst ID: " + lastWhiteboardId + "  newId: " + newWhiteboardId);
		
		int openSessionsOnBoard = getSessionCount(newWhiteboardId);
		ConnectionsModel connectionsModel = new ConnectionsModel(openSessionsOnBoard);
		ServerCommunicationModel connectionResponse = new ServerCommunicationModel(
				connectionsModel, "connections-new");
		sendMessageToWhiteboardClients(newWhiteboardId, connectionResponse);
		
		openSessionsOnBoard = getSessionCount(lastWhiteboardId);
		connectionsModel = new ConnectionsModel(openSessionsOnBoard);
		connectionResponse = new ServerCommunicationModel(connectionsModel, "connections-new");
		sendMessageToWhiteboardClients(lastWhiteboardId, connectionResponse);
	}
	
	private void sendMessageToWhiteboardClients(int whiteboardId,
			ServerCommunicationModel connectionResponse)
	{
		for (ClientModel clientModel : clientRepository.getAllClients().values())
		{
			if (clientModel.getSession().isOpen())
			{
				if (clientModel.getWhiteboardId() == whiteboardId)
				{
					MessageUtils.sendMessage(clientModel.getSession(), connectionResponse);
				}
			}
		}
	}
	
	private int getSessionCount(int whiteboardId)
	{
		int openSessionsOnBoard = 0;
		for (ClientModel clientModel : clientRepository.getAllClients().values())
		{
			if (clientModel.getWhiteboardId() == whiteboardId)
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