package iv.yhc3l.whiteboard.repository.service;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.repository.PostItRepository;
import iv.yhc3l.whiteboard.repository.WhiteboardRepository;

import java.util.Map;

public class PostItService implements PostItRepository
{
	private WhiteboardRepository whiteboardRepository;
	
	public PostItService(WhiteboardRepository whiteboard)
	{
		whiteboardRepository = whiteboard;
	}
	
	@Override
	public void createPostIt(PostItModel postIt, int whiteboardId)
	{
		whiteboardRepository.getWhiteboard(whiteboardId).addPostIt(postIt);
	}
	
	@Override
	public void updatePostIt(PostItModel postIt, int whiteboardId)
	{
		whiteboardRepository.getWhiteboard(whiteboardId).updatePostIt(postIt);
	}
	
	@Override
	public void removePostIt(PostItModel postIt, int whiteboardId)
	{
		whiteboardRepository.getWhiteboard(whiteboardId).removePostIt(postIt);
	}
	
	@Override
	public PostItModel getPostIt(int id, int whiteboardId)
	{
		return whiteboardRepository.getWhiteboard(whiteboardId).getPostIt(id);
	}
	
	@Override
	public Map<Integer, PostItModel> getAllPostIts(int whiteboardId)
	{
		return whiteboardRepository.getWhiteboard(whiteboardId).getPostIts();
	}
}
