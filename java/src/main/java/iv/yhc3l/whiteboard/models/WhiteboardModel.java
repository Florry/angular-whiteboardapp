package iv.yhc3l.whiteboard.models;

import iv.yhc3l.whiteboard.encoders.ServerCommunicationModelEncoder;
import iv.yhc3l.whiteboard.utils.Utils;

import java.util.LinkedHashMap;
import java.util.Map;

public final class WhiteboardModel
{
	
	private final int id;
	private final String name;
	private String timestamp;
	private final Map<Integer, PostItModel> postIts;
	private int postItId = 0;
	
	public WhiteboardModel(int id, String name)
	{
		this.id = id;
		this.name = name;
		updateTimestamp();
		this.postIts = new LinkedHashMap<Integer, PostItModel>();
	}
	
	public WhiteboardModel(int id, String name, Map<Integer, PostItModel> postItModels)
	{
		this.id = id;
		this.name = name;
		updateTimestamp();
		this.postIts = postItModels;
	}
	
	public WhiteboardModel(WhiteboardModel whiteboardModel)
	{
		this(whiteboardModel.id, whiteboardModel.name, whiteboardModel.postIts);
	}
	
	public int getId()
	{
		return id;
	}
	
	public String getName()
	{
		return name;
	}
	
	public String getTimestamp()
	{
		return timestamp;
	}
	
	private void updateTimestamp()
	{
		this.timestamp = Utils.getFormattedDate();
	}
	
	public Map<Integer, PostItModel> getPostIts()
	{
		return postIts;
	}
	
	public PostItModel getPostIt(int id)
	{
		return postIts.get(id);
	}
	
	public PostItModel addPostIt(PostItModel postIt)
	{
		PostItModel addPostIt = new PostItModel(postItId, postIt.getWhiteboardId(),
				postIt.getAuthor(), postIt.getText(), postIt.getStatus(), postIt.getPosition(),
				postIt.isRemoved(), postIt.getTimestamp());
		postIts.put(addPostIt.getId(), addPostIt);
		postItId += 1;
		updateTimestamp();
		
		return addPostIt;
	}
	
	public void removePostIt(PostItModel postIt)
	{
		postIts.remove(postIt.getId());
		updateTimestamp();
	}
	
	public void updatePostIt(PostItModel postIt)
	{
		postIts.put(postIt.getId(), postIt);
		updateTimestamp();
	}
	
	public String encode()
	{
		return ServerCommunicationModelEncoder.encodeObject(this);
	}
	
}
