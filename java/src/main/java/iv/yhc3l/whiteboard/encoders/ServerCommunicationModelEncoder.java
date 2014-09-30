package iv.yhc3l.whiteboard.encoders;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
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
		return encodeObjectToJson(objectModel).build().toString();
	}
	
	private static JsonObjectBuilder encodeObjectToJson(Object objectModel)
	{
		JsonObjectBuilder encoder = Json.createObjectBuilder();
		if (objectModel != null)
		{
			for (Method method : objectModel.getClass().getMethods())
			{
				String methodName = method.getName();
				if ((methodName.startsWith("get") || methodName.startsWith("is"))
						&& !method.getName().equals("getClass")
						&& method.getParameterTypes().length == 0)
				{
					String name = "";
					if (methodName.startsWith("is"))
					{
						name = method.getName().substring(2).toLowerCase();
					} else
					{
						name = method.getName().substring(3).toLowerCase();
					}
					
					Object methodResponse = null;
					try
					{
						methodResponse = method.invoke(objectModel);
					} catch (IllegalAccessException | InvocationTargetException
							| IllegalArgumentException e)
					{
						e.printStackTrace();
					}
					
					if (methodResponse instanceof String)
					{
						encoder.add(name, (String) methodResponse);
					} else if (methodResponse instanceof Integer)
					{
						encoder.add(name, (Integer) methodResponse);
					} else if (methodResponse instanceof Boolean)
					{
						encoder.add(name, (Boolean) methodResponse);
					} else if (methodResponse instanceof Map)
					{
						JsonObjectBuilder value = Json.createObjectBuilder();
						for (Object object : ((Map<?, ?>) methodResponse).values())
						{
							value.add(((PostItModel) object).getId() + "",
									encodeObjectToJson(object));
						}
						encoder.add(name, value);
					} else
					{
						JsonObjectBuilder value = encodeObjectToJson(methodResponse);
						encoder.add(name, value);
					}
					
				}
			}
		}
		return encoder;
	}
}
