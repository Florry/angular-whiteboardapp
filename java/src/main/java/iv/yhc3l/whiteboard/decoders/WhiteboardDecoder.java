package iv.yhc3l.whiteboard.decoders;

import iv.yhc3l.whiteboard.models.WhiteboardModel;

import java.io.StringReader;

import javax.json.Json;

public final class WhiteboardDecoder
{
	public static WhiteboardModel decode(String json)
	{
		final int id = Json.createReader(new StringReader(json)).readObject().getInt("id");
		final String name = Json.createReader(new StringReader(json)).readObject()
				.getString("name");
		
		return new WhiteboardModel(id, name);
	}
}
