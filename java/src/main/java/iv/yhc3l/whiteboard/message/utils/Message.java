package iv.yhc3l.whiteboard.message.utils;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.repository.dao.inmemory.WhiteboardDao;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import javax.websocket.Session;

public abstract class Message
{
	private static final WhiteboardDao wbd = new WhiteboardDao();
	public static final WhiteboardService whiteboardRepository = new WhiteboardService(wbd);
	public static final PostItService postItRepository = new PostItService(wbd);
	
	protected String message = "";
	
	public Message()
	{}
	
	public String getMessage()
	{
		return message;
	};
	
	public void run(Session session, PostItModel postIt)
	{}
}
