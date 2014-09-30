package iv.yhc3l.whiteboard.repository.dao.inmemory;

import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.repository.ClientRepository;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class ClientDao implements ClientRepository
{
	
	private static Map<String, ClientModel> clients = Collections
			.synchronizedMap(new HashMap<String, ClientModel>());
	
	@Override
	public void addClient(ClientModel client)
	{
		clients.put(client.getId(), client);
	}
	
	@Override
	public void removeClient(ClientModel client)
	{
		clients.remove(client.getId());
	}
	
	@Override
	public void updateClient(ClientModel client)
	{
		clients.put(client.getId(), client);
	}
	
	@Override
	public ClientModel getClient(String clientId)
	{
		return clients.get(clientId);
	}
	
	@Override
	public Map<String, ClientModel> getAllClients()
	{
		return clients;
	}
	
}
