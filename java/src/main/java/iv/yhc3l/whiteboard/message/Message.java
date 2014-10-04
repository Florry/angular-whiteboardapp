package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.app.App;
import iv.yhc3l.whiteboard.repository.service.ClientService;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import javax.websocket.Session;

public abstract class Message
{
	protected static final WhiteboardService whiteboardRepository = App.whiteboardRepository;
	protected static final PostItService postItRepository = App.postItRepository;
	protected static final ClientService clientRepository = App.clientRepository;
	
	protected String message = "";
	
	public Message()
	{}
	
	public String getMessage()
	{
		return message;
	};
	
	public abstract void run(Session session, Object data);
}
