package iv.yhc3l.whiteboard.repository;

import iv.yhc3l.whiteboard.models.ClientModel;

import java.util.Map;

public interface ClientRepository
{
	public void addClient(ClientModel client);
	
	public void removeClient(ClientModel client);
	
	public void updateClient(ClientModel client);
	
	public ClientModel getClient(String clientId);
	
	public Map<String, ClientModel> getAllClients();
}
