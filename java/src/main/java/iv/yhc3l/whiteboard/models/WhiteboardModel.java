package iv.yhc3l.whiteboard.models;

import iv.yhc3l.whiteboard.encoders.WhiteboardEncoder;
import iv.yhc3l.whiteboard.utils.Utils;

import java.util.ArrayList;

public class WhiteboardModel
{
	
	private final int id;
	private final String name;
	private String timestamp;
	private final ArrayList<PostItModel> PostItModels;
	
	public WhiteboardModel(int id, String name)
	{
		this.id = id;
		this.name = name;
		this.timestamp = Utils.getFormattedDate();
		this.PostItModels = new ArrayList<PostItModel>();
	}
	
	public WhiteboardModel(int id, String name, ArrayList<PostItModel> postItModels)
	{
		this.id = id;
		this.name = name;
		this.timestamp = Utils.getFormattedDate();
		this.PostItModels = postItModels;
	}
	
	public WhiteboardModel(WhiteboardModel whiteboardModel)
	{
		this(whiteboardModel.id, whiteboardModel.name, whiteboardModel.PostItModels);
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
	
	public ArrayList<PostItModel> getPostItModels()
	{
		return PostItModels;
	}
	
	public void addPostItModel(PostItModel postItModel)
	{
		PostItModels.add(postItModel);
		this.timestamp = Utils.getFormattedDate();
	}
	
	public String encode()
	{
		return WhiteboardEncoder.encode(this);
	}
}
