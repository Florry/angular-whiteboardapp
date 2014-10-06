package iv.yhc3l.whiteboard.server;

import iv.yhc3l.whiteboard.app.App;
import iv.yhc3l.whiteboard.decoders.WhiteboardDecoder;
import iv.yhc3l.whiteboard.encoders.EncodeUtils;
import iv.yhc3l.whiteboard.models.WhiteboardModel;
import iv.yhc3l.whiteboard.repository.service.WhiteboardService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/whiteboards")
public final class WhiteboardServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	public static WhiteboardService repository = App.whiteboardRepository;
	
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
			Map<Integer, WhiteboardModel> whiteboards = repository.getAllWhiteboards();
			JsonObjectBuilder whiteboardsJson = Json.createObjectBuilder();
			for (WhiteboardModel whiteboardModel : whiteboards.values())
			{
				whiteboardsJson.add(whiteboardModel.getId() + "",
						EncodeUtils.encodeObjectToJson(whiteboardModel));
			}
			addResponseHeaders(response);
			out.write(whiteboardsJson.build().toString());
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
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
	{
		addResponseHeaders(response);
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
		
		repository.updateWhiteboard(whiteboard.getId(), whiteboard.getName());
		
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
	{
		String requestId = request.getParameter("delete");
		if (requestId != null)
		{
			int whiteboardId = Integer.parseInt(requestId);
			addResponseHeaders(response);
			
			repository.removeWhiteboard(whiteboardId);
		}
		
	}
	
	protected void doOptions(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		addResponseHeaders(response);
	}
	
	public void addResponseHeaders(HttpServletResponse response)
	{
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
		response.addHeader("Access-Control-Allow-Headers",
				"X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");
	}
}
