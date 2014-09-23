package iv.yhc3l.whiteboard.encoders;

import iv.yhc3l.whiteboard.models.WhiteboardModel;

import javax.json.Json;

public class WhiteboardEncoder
{
	public static String encode(WhiteboardModel whiteboard)
	{
		
		return Json.createObjectBuilder().add("id", whiteboard.getId())
				.add("name", whiteboard.getName()).add("timestamp", whiteboard.getTimestamp())
				.build().toString();
	}
}
