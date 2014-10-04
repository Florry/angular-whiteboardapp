package iv.yhc3l.whiteboard.models;

public final class ClientMessageModel
{
	private int whiteboardId;
	
	public ClientMessageModel(int whiteboardId)
	{
		this.whiteboardId = whiteboardId;
	}
	
	public int getWhiteboardId()
	{
		return whiteboardId;
	}
}
