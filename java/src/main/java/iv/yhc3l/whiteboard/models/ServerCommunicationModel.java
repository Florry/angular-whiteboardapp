package iv.yhc3l.whiteboard.models;

public final class ServerCommunicationModel
{
	private Object data;
	private String message;
	
	public ServerCommunicationModel(Object data, String message)
	{
		this.data = data;
		this.message = message;
	}
	
	public Object getData()
	{
		return data;
	}
	
	public String getMessage()
	{
		return message;
	}
	
}
