package iv.yhc3l.whiteboard.repository.service;

import iv.yhc3l.whiteboard.models.WhiteboardModel;
import iv.yhc3l.whiteboard.repository.WhiteboardRepository;

import java.util.Map;

public final class WhiteboardService implements WhiteboardRepository
{
	WhiteboardRepository whiteboardRepository;
	
	public WhiteboardService(WhiteboardRepository repository)
	{
		whiteboardRepository = repository;
	}
	
	@Override
	public void createWhiteboard(WhiteboardModel whiteboard)
	{
		whiteboardRepository.createWhiteboard(whiteboard);
	}
	
	@Override
	public void updateWhiteboard(int id, String whiteboardName)
	{
		whiteboardRepository.updateWhiteboard(id, whiteboardName);
	}
	
	@Override
	public void removeWhiteboard(int id)
	{
		whiteboardRepository.removeWhiteboard(id);
	}
	
	@Override
	public WhiteboardModel getWhiteboard(int id)
	{
		return whiteboardRepository.getWhiteboard(id);
	}
	
	@Override
	public Map<Integer, WhiteboardModel> getAllWhiteboards()
	{
		return whiteboardRepository.getAllWhiteboards();
	}
	
}
