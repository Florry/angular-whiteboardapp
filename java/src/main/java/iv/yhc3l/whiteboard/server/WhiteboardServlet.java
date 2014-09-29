package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.decoders.WhiteboardDecoder;
import iv.yhc3l.whiteboard.models.WhiteboardModel;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/whiteboards")
public class WhiteboardServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	public static WhiteboardService repository = WebsocketEndpoint.whiteboardRepository;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		response.setContentType("text");
		PrintWriter out = response.getWriter();
		
		String requestId = request.getParameter("id");
		if (requestId != null && requestId != "" && repository.getAllWhiteboards().size() > 0)
		{
			int whiteboardId = Integer.parseInt(requestId);
			out.write(repository.getWhiteboard(whiteboardId).encode());
		} else
		{
			StringBuilder whiteboardsJson = new StringBuilder();
			whiteboardsJson.append("[");
			for (int i = 0; i < repository.getAllWhiteboards().size(); i++)
			{
				whiteboardsJson.append(repository.getWhiteboard(i).encode());
				if (i != repository.getAllWhiteboards().size() - 1)
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
		WhiteboardModel newWhiteboard = new WhiteboardModel(0, whiteboard.getName());
		
		repository.createWhiteboard(newWhiteboard);
	}
	
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	{	
		
	}
}
