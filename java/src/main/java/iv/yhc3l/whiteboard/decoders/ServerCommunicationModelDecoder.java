package iv.yhc3l.whiteboard.decoders;

import iv.yhc3l.whiteboard.models.PositionModel;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

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
		JsonObject postitObject = Json.createReader(new StringReader(json)).readObject()
				.getJsonObject("data");
		String messageString = Json.createReader(new StringReader(json)).readObject()
				.getString("message");
		
		int id = postitObject.getInt("id");
		int whiteboardId = postitObject.getInt("whiteboardId");
		String author = postitObject.getString("author");
		String text = postitObject.getString("text");
		String status = postitObject.getString("status");
		
		JsonObject positionJson = postitObject.getJsonObject("position");
		PositionModel position = new PositionModel(positionJson.getInt("x"),
				positionJson.getInt("y"));
		
		boolean removed = postitObject.getBoolean("removed");
		String timestamp = postitObject.getString("timestamp");
		
		PostItModel postIt = new PostItModel(id, whiteboardId, author, text, status, position,
				removed, timestamp);
		
		return new ServerCommunicationModel(postIt, messageString);
		
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