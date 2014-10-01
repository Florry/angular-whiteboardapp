package iv.yhc3l.whiteboard.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public final class Utils
{
	public static String getFormattedDate()
	{
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = formatter.format(date);
		return formattedDate;
	}
	
	public static void println(Object obj)
	{
		System.out.println(obj.getClass().getSimpleName() + " says hello");
	}
}
