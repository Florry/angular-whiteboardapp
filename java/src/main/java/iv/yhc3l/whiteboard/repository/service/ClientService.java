package iv.yhc3l.whiteboard.repository.service;

import iv.yhc3l.whiteboard.models.ClientModel;
import iv.yhc3l.whiteboard.repository.ClientRepository;

import java.util.Map;

public final class ClientService implements ClientRepository
{
	private ClientRepository clientRepository;
	
	public ClientService(ClientRepository clientRepository)
	{
		this.clientRepository = clientRepository;
	}
	
	@Override
	public void addClient(ClientModel client)
	{
		clientRepository.addClient(client);
	}
	
	@Override
	public void removeClient(ClientModel client)
	{
		clientRepository.removeClient(client);
	}
	
	@Override
	public void updateClient(ClientModel client)
	{
		clientRepository.updateClient(client);
	}
	
	@Override
	public ClientModel getClient(String clientId)
	{
		return clientRepository.getClient(clientId);
	}
	
	@Override
	public Map<String, ClientModel> getAllClients()
	{
		return clientRepository.getAllClients();
	}
	
}
