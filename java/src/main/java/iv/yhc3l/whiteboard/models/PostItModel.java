package iv.yhc3l.whiteboard.models;

public class PostItModel
{
	private int id;
	private String author;
	private String text;
	private String status;
	private PositionModel position;
	private boolean removed;
	private String timestamp;
	
	public PostItModel(int id, String author, String text, String status, PositionModel position,
			boolean removed, String timestamp)
	{
		this.id = id;
		this.author = author;
		this.text = text;
		this.status = status;
		this.position = position;
		this.removed = removed;
		this.timestamp = timestamp;
	}
	
	public PostItModel(PostItModel postit)
	{
		this(postit.id, postit.author, postit.text, postit.status, postit.position, postit.removed,
				postit.timestamp);
	}
	
	public int getId()
	{
		return id;
	}
	
	public String getAuthor()
	{
		return author;
	}
	
	public String getText()
	{
		return text;
	}
	
	public String getStatus()
	{
		return status;
	}
	
	public PositionModel getPosition()
	{
		return position;
	}
	
	public boolean isRemoved()
	{
		return removed;
	}
	
	public String getTimestamp()
	{
		return timestamp;
	}
	
}
