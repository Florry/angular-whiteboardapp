package iv.yhc3l.whiteboard.encoders;

import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public final class ServerCommunicationModelEncoder implements
		Encoder.Text<ServerCommunicationModel>
{
	
	@Override
	public String encode(ServerCommunicationModel communicationModel) throws EncodeException
	{
		return encodeObject(communicationModel);
	}
	
	@Override
	public void destroy()
	{}
	
	@Override
	public void init(EndpointConfig endpointConfig)
	{}
	
	public static String encodeObject(Object objectModel)
	{
		return EncodeUtils.encodeObjectToJson(objectModel).build().toString();
	}
	
}
