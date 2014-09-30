package iv.yhc3l.whiteboard.repository.service;

import iv.yhc3l.whiteboard.models.WhiteboardModel;
import iv.yhc3l.whiteboard.repository.WhiteboardRepository;

import java.util.Map;

public final class WhiteboardService
{
	WhiteboardRepository whiteboardRepository;
	
	public WhiteboardService(WhiteboardRepository repository)
	{
		whiteboardRepository = repository;
	}
	
	public void createWhiteboard(WhiteboardModel whiteboard)
	{
		whiteboardRepository.createWhiteboard(whiteboard);
	}
	
	public void updateWhiteboard(int id, String whiteboardName)
	{
		whiteboardRepository.updateWhiteboard(id, whiteboardName);
	}
	
	public void removeWhiteboard(int id)
	{
		whiteboardRepository.removeWhiteboard(id);
	}
	
	public WhiteboardModel getWhiteboard(int id)
	{
		return whiteboardRepository.getWhiteboard(id);
	}
	
	public Map<Integer, WhiteboardModel> getAllWhiteboards()
	{
		return whiteboardRepository.getAllWhiteboards();
	}
	
}
