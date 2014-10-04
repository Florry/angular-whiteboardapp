package iv.yhc3l.whiteboard.app;

import iv.yhc3l.whiteboard.message.Connections;
import iv.yhc3l.whiteboard.message.MessageHandler;
import iv.yhc3l.whiteboard.message.client.CreateClient;
import iv.yhc3l.whiteboard.message.client.RemoveClient;
import iv.yhc3l.whiteboard.message.client.UpdateClient;
import iv.yhc3l.whiteboard.message.postit.CreatePostIt;
import iv.yhc3l.whiteboard.message.postit.RemovePostIt;
import iv.yhc3l.whiteboard.message.postit.UpdatePostIt;
import iv.yhc3l.whiteboard.repository.dao.inmemory.ClientDao;
import iv.yhc3l.whiteboard.repository.dao.inmemory.WhiteboardDao;
import iv.yhc3l.whiteboard.repository.service.ClientService;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

public final class App
{
	// DATA ACCESSMODELS
	private static final WhiteboardDao wbDao = new WhiteboardDao();
	private static final ClientDao clDao = new ClientDao();
	
	// REPOSITORIES
	public static final WhiteboardService whiteboardRepository = new WhiteboardService(wbDao);
	public static final PostItService postItRepository = new PostItService(wbDao);
	public static final ClientService clientRepository = new ClientService(clDao);
	
	// MESSAGE HANDLER
	public static final MessageHandler messageHandler = new MessageHandler(new CreatePostIt(),
			new UpdatePostIt(), new RemovePostIt(), new CreateClient(), new UpdateClient(),
			new RemoveClient(), new Connections());
}
