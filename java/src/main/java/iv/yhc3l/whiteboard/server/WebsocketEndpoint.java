package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.ServerCommunicationModelDecoder;
import iv.yhc3l.whiteboard.encoders.ServerCommunicationModelEncoder;
import iv.yhc3l.whiteboard.models.ConnectionsModel;
import iv.yhc3l.whiteboard.models.PositionModel;
import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.models.ServerCommunicationModel;
import iv.yhc3l.whiteboard.models.WhiteboardModel;
import iv.yhc3l.whiteboard.repository.dao.inmemory.WhiteboardDao;
import iv.yhc3l.whiteboard.repository.service.PostItService;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/whiteboard", decoders =
{ ServerCommunicationModelDecoder.class }, encoders =
{ ServerCommunicationModelEncoder.class })
public class WebsocketEndpoint
{
	private static final WhiteboardDao wbd = new WhiteboardDao();
	public static final WhiteboardService whiteboardRepository = new WhiteboardService(wbd);
	public static final PostItService postItRepository = new PostItService(wbd);
	
	@OnOpen
	public void whiteboardOnOpen(Session session)
	{
		{// DEBUG
			WhiteboardModel whiteboard = new WhiteboardModel(-1, "bob");
			WhiteboardModel whiteboard2 = new WhiteboardModel(-1, "bob2");
			WhiteboardModel whiteboard3 = new WhiteboardModel(-1, "bob3");
			whiteboardRepository.createWhiteboard(whiteboard);
			whiteboardRepository.createWhiteboard(whiteboard2);
			whiteboardRepository.createWhiteboard(whiteboard3);
			
			PostItModel postit = new PostItModel(1, 1, "hello", "ello there", "in progress",
					new PositionModel(2, 4), false);
			
			for (int i = 0; i < 10; i++)
			{
				postItRepository.createPostIt(postit);
			}
		}// DEBUG END
		
		for (int i = 0; i < session.getOpenSessions().size(); i++)
		{
			ServerCommunicationModel message = new ServerCommunicationModel(new ConnectionsModel(
					session.getOpenSessions().size()), "connections");
			sendMessageToAll(session, message, true);
		}
	}
	
	@OnMessage
	public void whiteboardOnMessage(Session session, ServerCommunicationModel msg)
	{
		PostItModel postIt = new PostItModel((PostItModel) msg.getData());
		switch (msg.getMessage())
		{
			case "postit-create":
				createPostIt(session, postIt);
				break;
			case "postit-update":
				updatePostIt(session, postIt);
				break;
			case "postit-remove":
				removePostIt(session, postIt);
				break;
		}
	}
	
	@OnClose
	public void whiteboardOnClose(Session session, CloseReason reason)
	{
		System.out.println("Session: " + session.getId() + " disconnected, reason: "
				+ reason.getReasonPhrase());
	}
	
	@OnError
	public void whiteboardOnError(Session session, Throwable throwable)
	{
		System.err.println(throwable.getLocalizedMessage());
	}
	
	public void createPostIt(Session session, PostItModel postIt)
	{
		postItRepository.createPostIt(postIt);
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-created");
		sendMessageToAll(session, response, false);
	}
	
	public void updatePostIt(Session session, PostItModel postIt)
	{
		postItRepository.updatePostIt(postIt);
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-updated");
		sendMessageToAll(session, response, false);
	}
	
	public void removePostIt(Session session, PostItModel postIt)
	{
		postItRepository.removePostIt(postIt);
		ServerCommunicationModel response = new ServerCommunicationModel(postIt, "postit-deleted");
		sendMessageToAll(session, response, false);
	}
	
	private void sendMessageToAll(Session session, Object message, boolean sendToInstigator)
	{
		for (Session sess : session.getOpenSessions())
		{
			if (sess.isOpen() && (sendToInstigator ? true : !sess.getId().equals(session.getId())))
			{
				sess.getAsyncRemote().sendObject(message);
			}
		}
	}
}
