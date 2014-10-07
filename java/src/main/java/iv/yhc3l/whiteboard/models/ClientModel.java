package iv.yhc3l.whiteboard.models;

import javax.websocket.Session;

public final class ClientModel
{
	private int whiteboardId;
	private Session session;
	
	public ClientModel(Session session)
	{
		this.session = session;
		this.whiteboardId = -1;
	}
	
	public ClientModel(ClientModel client)
	{
		this.session = client.getSession();
		this.whiteboardId = client.getWhiteboardId();
	}
	
	public ClientModel(ClientModel client, int whiteboardId)
	{
		this.session = client.getSession();
		this.whiteboardId = whiteboardId;
	}
	
	public ClientModel(Session session, int whiteboardId)
	{
		this.session = session;
		this.whiteboardId = whiteboardId;
	}
	
	public int getWhiteboardId()
	{
		return whiteboardId;
	}
	
	public Session getSession()
	{
		return session;
	}
	
	public String getId()
	{
		return session.getId();
	}
	
	@Override
	public boolean equals(Object object)
	{
		if (object instanceof Session)
		{
			return this.session.getId().equals(((Session) object).getId());
		} else
		{
			return false;
		}
	}
	
}
