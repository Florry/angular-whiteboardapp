package iv.yhc3l.whiteboard.models;

import iv.yhc3l.whiteboard.utils.Utils;

public class PostItModel
{
	private final int id;
	private final String author;
	private final String text;
	private final String status;
	private final PositionModel position;
	private final boolean removed;
	private final String timestamp;
	
	public PostItModel(final int id, final String author, final String text, final String status,
			final PositionModel position, final boolean removed)
	{
		this.id = id;
		this.author = author;
		this.text = text;
		this.status = status;
		this.position = position;
		this.removed = removed;
		this.timestamp = Utils.getFormattedDate();
	}
	
	public PostItModel(final PostItModel postit)
	{
		this(postit.id, postit.author, postit.text, postit.status, postit.position, postit.removed);
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
	
	public String toString()
	{
		final StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append(author);
		stringBuilder.append("\n");
		stringBuilder.append(text);
		stringBuilder.append("\n");
		stringBuilder.append(status);
		stringBuilder.append("\n");
		stringBuilder.append(timestamp);
		stringBuilder.append("\n");
		
		return stringBuilder.toString();
	}
	
	@Override
	public int hashCode()
	{
		int result = 1;
		result += 37 * this.author.hashCode();
		result += 37 * this.text.hashCode();
		result += 37 * this.status.hashCode();
		result += 37 * this.position.hashCode();
		result += 37 * this.timestamp.hashCode();
		result += 37 * this.getClass().hashCode();
		
		return result;
	}
	
	@Override
	public boolean equals(Object other)
	{
		PostItModel otherPostIt = (PostItModel) other;
		if (other == this || otherPostIt.getId() == this.getId())
		{
			return true;
		}
		
		return false;
	}
}
