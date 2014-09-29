package iv.yhc3l.whiteboard.models;

public class ConnectionsModel extends WhiteboardObjectModel
{
	private int connections;
	
	public ConnectionsModel(int connections)
	{
		this.connections = connections;
	}
	
	public int getConnections()
	{
		return connections;
	}
	
	public void setConnections(int connections)
	{
		this.connections = connections;
	}
	
}
