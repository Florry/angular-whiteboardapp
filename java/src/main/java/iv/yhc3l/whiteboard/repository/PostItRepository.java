package iv.yhc3l.whiteboard.repository;

import iv.yhc3l.whiteboard.models.PostItModel;

import java.util.Map;

public interface PostItRepository
{
	public void createPostIt(PostItModel postIt);
	
	public void updatePostIt(PostItModel postIt);
	
	public void removePostIt(PostItModel postIt);
	
	public PostItModel getPostIt(int id, int whiteboardId);
	
	public Map<Integer, PostItModel> getAllPostIts(int whiteboardId);
}