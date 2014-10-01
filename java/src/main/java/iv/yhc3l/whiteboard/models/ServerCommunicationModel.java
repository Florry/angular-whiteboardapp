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
	
	public ServerCommunicationModel(ServerCommunicationModel communicationModel)
	{
		this.data = communicationModel.getData();
		this.message = communicationModel.getMessage();
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
