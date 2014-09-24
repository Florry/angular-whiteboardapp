package iv.yhc3l.whiteboard.encoders;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.json.Json;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class ServerCommunicationModelEncoder implements Encoder.Text<ServerCommunicationModel>
{
	
	@Override
	public String encode(ServerCommunicationModel communicationModel) throws EncodeException
	{
		if (communicationModel.getPostit() instanceof PostItModel)
		{
			PostItModel postit = (PostItModel) communicationModel.getPostit();
			return Json
					.createObjectBuilder()
					.add("data",
							Json.createObjectBuilder()
									.add("id", postit.getId())
									.add("whiteboardId", postit.getWhiteboardId())
									.add("author", postit.getAuthor())
									.add("text", postit.getText())
									.add("status", postit.getStatus())
									.add("position",
											Json.createObjectBuilder()
													.add("x", postit.getPosition().x)
													.add("y", postit.getPosition().y))
									.add("removed", postit.isRemoved())
									.add("timestamp", postit.getTimestamp()))
					.add("message", communicationModel.getMessage()).build().toString();
		} else
		{
			return Json.createObjectBuilder().add("data", "")
					.add("message", communicationModel.getMessage()).build().toString();
		}
	}
	
	@Override
	public void destroy()
	{}
	
	@Override
	public void init(EndpointConfig endpointConfig)
	{}
}
