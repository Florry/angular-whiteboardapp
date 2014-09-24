package iv.yhc3l.whiteboard.repository;

import iv.yhc3l.whiteboard.models.WhiteboardModel;

import java.util.List;

public interface WhiteboardRepository
{
	public void createWhiteboard(WhiteboardModel whiteboard);
	
	public void updateWhiteboard(int id, String whiteboardName);
	
	public void removeWhiteboard(int id);
	
	public WhiteboardModel readWhiteboard(int id);
	
	public List<WhiteboardModel> readWhiteboards();
	
}
