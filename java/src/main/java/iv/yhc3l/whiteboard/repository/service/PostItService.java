package iv.yhc3l.whiteboard.repository.service;

import iv.yhc3l.whiteboard.models.PostItModel;
import iv.yhc3l.whiteboard.repository.PostItRepository;
import iv.yhc3l.whiteboard.repository.WhiteboardRepository;

import java.util.Map;

public final class PostItService implements PostItRepository
{
	private WhiteboardRepository whiteboardRepository;
	
	public PostItService(WhiteboardRepository whiteboard)
	{
		whiteboardRepository = whiteboard;
	}
	
	@Override
	public PostItModel createPostIt(PostItModel postIt)
	{
		return whiteboardRepository.getWhiteboard(postIt.getWhiteboardId()).addPostIt(postIt);
	}
	
	@Override
	public void updatePostIt(PostItModel postIt)
	{
		whiteboardRepository.getWhiteboard(postIt.getWhiteboardId()).updatePostIt(postIt);
	}
	
	@Override
	public void removePostIt(PostItModel postIt)
	{
		whiteboardRepository.getWhiteboard(postIt.getWhiteboardId()).removePostIt(postIt);
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
