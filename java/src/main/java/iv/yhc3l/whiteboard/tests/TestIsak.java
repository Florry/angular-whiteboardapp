package iv.yhc3l.whiteboard.tests;

import iv.yhc3l.whiteboard.decoders.WhiteboardDecoder;
import iv.yhc3l.whiteboard.models.WhiteboardModel;

public class TestIsak
{
	public static void main(String[] args)
	{
		test();
	}
	
	private static void test()
	{
		WhiteboardModel wb = new WhiteboardModel(12, "test");
		WhiteboardModel wb2 = WhiteboardDecoder
				.decode("{\"id\":120,\"name\":\"test2\",\"timestamp\":\"2014-09-23 03:09\"}");
		System.out.println(wb.encode());
		System.out.println(wb2.encode());
	}
	
}
