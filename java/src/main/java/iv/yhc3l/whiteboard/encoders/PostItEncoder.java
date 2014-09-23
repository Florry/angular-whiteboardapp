package iv.yhc3l.whiteboard.encoders;

import iv.yhc3l.whiteboard.models.PostItModel;

import javax.json.Json;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public final class PostItEncoder implements Encoder.Text<PostItModel>
{
	
	@Override
	public String encode(PostItModel postit) throws EncodeException
	{
		return Json
				.createObjectBuilder()
				.add("id", postit.getId())
				.add("whiteboardId", postit.getWhiteboardId())
				.add("author", postit.getAuthor())
				.add("text", postit.getText())
				.add("status", postit.getStatus())
				.add("position",
						Json.createObjectBuilder().add("x", postit.getPosition().x)
								.add("y", postit.getPosition().y))
				.add("removed", postit.isRemoved()).add("timestamp", postit.getTimestamp()).build()
				.toString();
	}
	
	@Override
	public void destroy()
	{}
	
	@Override
	public void init(EndpointConfig endpointConfig)
	{}
	
}
