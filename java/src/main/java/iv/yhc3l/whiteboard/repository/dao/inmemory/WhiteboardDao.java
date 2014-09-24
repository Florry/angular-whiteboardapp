package iv.yhc3l.whiteboard.repository.dao.inmemory;

import iv.yhc3l.whiteboard.models.WhiteboardModel;
import iv.yhc3l.whiteboard.repository.WhiteboardRepository;

import java.util.LinkedHashMap;
import java.util.Map;

public class WhiteboardDao implements WhiteboardRepository
{
	private static Map<Integer, WhiteboardModel> whiteboards = new LinkedHashMap<Integer, WhiteboardModel>();
	
	@Override
	public void createWhiteboard(WhiteboardModel whiteboard)
	{
		whiteboards.put(whiteboard.getId(), whiteboard);
	}
	
	@Override
	public void updateWhiteboard(int id, String whiteboardName)
	{
		WhiteboardModel whiteboard = whiteboards.get(id);
		WhiteboardModel updatedWhiteboard = new WhiteboardModel(whiteboard.getId(), whiteboardName,
				whiteboard.getPostItModels());
		
		whiteboards.put(id, updatedWhiteboard);
	}
	
	@Override
	public void removeWhiteboard(int id)
	{
		whiteboards.remove(id);
	}
	
	@Override
	public WhiteboardModel getWhiteboard(int id)
	{
		return whiteboards.get(id);
	}
	
	@Override
	public Map<Integer, WhiteboardModel> getAllWhiteboards()
	{
		return whiteboards;
	}
}
