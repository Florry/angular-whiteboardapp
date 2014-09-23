package iv.yhc3l.whiteboard.decoders;

import iv.yhc3l.whiteboard.models.PositionModel;
import iv.yhc3l.whiteboard.models.PostItModel;

import java.io.StringReader;

import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class PostItDecoder implements Decoder.Text<PostItModel>
{
	@Override
	public PostItModel decode(String json) throws DecodeException
	{
		int id = Json.createReader(new StringReader(json)).readObject().getInt("id");
		int whiteboardId = Json.createReader(new StringReader(json)).readObject()
				.getInt("whiteboardId");
		String author = Json.createReader(new StringReader(json)).readObject().getString("author");
		String text = Json.createReader(new StringReader(json)).readObject().getString("text");
		String status = Json.createReader(new StringReader(json)).readObject().getString("status");
		
		JsonObject positionJson = Json.createReader(new StringReader(json)).readObject()
				.getJsonObject("position");
		PositionModel position = new PositionModel(positionJson.getInt("x"),
				positionJson.getInt("y"));
		
		boolean removed = Json.createReader(new StringReader(json)).readObject()
				.getBoolean("removed");
		String timestamp = Json.createReader(new StringReader(json)).readObject()
				.getString("timestamp");
		
		return new PostItModel(id, whiteboardId, author, text, status, position, removed, timestamp);
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
