package iv.yhc3l.whiteboard.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils
{
	public static String getFormattedDate()
	{
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		String formattedDate = formatter.format(date);
		return formattedDate;
	}
}
