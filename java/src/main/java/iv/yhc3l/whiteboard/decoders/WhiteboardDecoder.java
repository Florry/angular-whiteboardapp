package iv.yhc3l.whiteboard.decoders;

import iv.yhc3l.whiteboard.models.WhiteboardModel;

import java.io.StringReader;

import javax.json.Json;

public class WhiteboardDecoder
{
	public WhiteboardModel decode(String json)
	{
		int id = Json.createReader(new StringReader(json)).readObject().getInt("id");
		String name = Json.createReader(new StringReader(json)).readObject().getString("name");
		
		return new WhiteboardModel(id, name);
	}
}
