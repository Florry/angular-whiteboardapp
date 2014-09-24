package iv.yhc3l.whiteboard.repository;

import iv.yhc3l.whiteboard.models.PostItModel;

import java.util.Map;

public interface PostItRepository
{
	public void createPostIt(PostItModel postIt, int whiteboardId);
	
	public void updatePostIt(PostItModel postIt, int whiteboardId);
	
	public void removePostIt(PostItModel postIt, int whiteboardId);
	
	public PostItModel getPostIt(int id, int whiteboardId);
	
	public Map<Integer, PostItModel> getAllPostIts(int whiteboardId);
}