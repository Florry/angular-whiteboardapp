package iv.yhc3l.whiteboard.message;

import iv.yhc3l.whiteboard.repository.dao.inmemory.ClientDao;
import iv.yhc3l.whiteboard.repository.dao.inmemory.WhiteboardDao;
import iv.yhc3l.whiteboard.repository.service.ClientService;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import javax.websocket.Session;

public abstract class Message
{
	private static final WhiteboardDao wbDao = new WhiteboardDao();
	private static final ClientDao clDao = new ClientDao();
	private static final WhiteboardService whiteboardRepository = new WhiteboardService(wbDao);
	protected static final PostItService postItRepository = new PostItService(wbDao);
	protected static final ClientService clientRepository = new ClientService(clDao);
	
	protected String message = "";
	
	public Message()
	{}
	
	public String getMessage()
	{
		return message;
	};
	
	public void run(Session session, Object data)
	{}

	public static WhiteboardService getWhiteboardrepository()
	{
		return whiteboardRepository;
	}
}
