package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.WhiteboardDecoder;
import iv.yhc3l.whiteboard.models.WhiteboardModel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/whiteboards")
public class WhiteboardServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	private static List<WhiteboardModel> whiteboards = new ArrayList<WhiteboardModel>();
	private static int id = 0;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		response.setContentType("text");
		PrintWriter out = response.getWriter();
		
		String requestId = request.getParameter("id");
		if (requestId != null && requestId != "")
		{
			int whiteboardId = Integer.parseInt(requestId);
			for (int i = 0; i < whiteboards.size(); i++)
			{
				if (whiteboards.get(i).getId() == whiteboardId)
				{
					out.write(whiteboards.get(i).encode());
					break;
				}
			}
		} else
		{
			StringBuilder whiteboardsJson = new StringBuilder();
			whiteboardsJson.append("[");
			for (int i = 0; i < whiteboards.size(); i++)
			{
				whiteboardsJson.append(whiteboards.get(i).encode());
				if (i != whiteboards.size() - 1)
				{
					whiteboardsJson.append(",");
				}
			}
			whiteboardsJson.append("]");
			out.write(whiteboardsJson.toString());
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	{
		StringBuffer stringBuffer = new StringBuffer();
		String line = null;
		try
		{
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null)
			{
				stringBuffer.append(line);
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		String jsonString = stringBuffer.toString();
		WhiteboardModel whiteboard = WhiteboardDecoder.decode(jsonString);
		WhiteboardModel newWhiteboard = new WhiteboardModel(id, whiteboard.getName());
		whiteboards.add(newWhiteboard);
		id += 1;
	}
}
