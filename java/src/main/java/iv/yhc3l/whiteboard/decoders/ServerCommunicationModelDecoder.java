package iv.yhc3l.whiteboard.decoders;

import iv.yhc3l.whiteboard.models.ClientMessageModel;
import iv.yhc3l.whiteboard.models.PositionModel;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.utils.Utils;

import java.io.StringReader;

import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public final class ServerCommunicationModelDecoder implements
		Decoder.Text<ServerCommunicationModel>
{
	@Override
	public ServerCommunicationModel decode(String json) throws DecodeException
	{
		JsonObject dataObject = Json.createReader(new StringReader(json)).readObject()
				.getJsonObject("data");
		
		String messageString = Json.createReader(new StringReader(json)).readObject()
				.getString("message");
		
		Utils.println(this);
		
		if (messageString.contains("postit"))
		{
			int id = dataObject.getInt("id");
			int whiteboardId = dataObject.getInt("whiteboardId");
			String author = dataObject.getString("author");
			String text = dataObject.getString("text");
			String status = dataObject.getString("status");
			
			JsonObject positionJson = dataObject.getJsonObject("position");
			PositionModel position = new PositionModel(positionJson.getInt("x"),
					positionJson.getInt("y"));
			
			boolean removed = dataObject.getBoolean("removed");
			String timestamp = dataObject.getString("timestamp");
			
			PostItModel postIt = new PostItModel(id, whiteboardId, author, text, status, position,
					removed, timestamp);
			
			return new ServerCommunicationModel(postIt, messageString);
			
		} else if (messageString.contains("client"))
		{
			int whiteboardId = dataObject.getInt("whiteboardId");
			ClientMessageModel clientMessage = new ClientMessageModel(whiteboardId);
			return new ServerCommunicationModel(clientMessage, messageString);
		}
		return null;
	}
	
	@Override
	public boolean willDecode(String json)
	{
		try
		{
			Json.createReader(new StringReader(json)).readObject();
			return true;
		} catch (Exception e)
		{
			return false;
		}
	}
	
	@Override
	public void init(EndpointConfig endpointConfig)
	{}
	
	@Override
	public void destroy()
	{}
	
}