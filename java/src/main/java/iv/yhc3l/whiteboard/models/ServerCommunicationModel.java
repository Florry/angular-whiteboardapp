package iv.yhc3l.whiteboard.models;

public class ServerCommunicationModel
{
	private WhiteboardObjectModel data;
	private String message;
	
	public ServerCommunicationModel(WhiteboardObjectModel postit, String message)
	{
		this.data = postit;
		this.message = message;
	}
	
	public WhiteboardObjectModel getPostit()
	{
		return data;
	}
	
	public String getMessage()
	{
		return message;
	}
	
}
