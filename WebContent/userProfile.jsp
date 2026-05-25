<%@ page import="java.sql.*, java.util.*" %>
<%@ page contentType="application/json;charset=UTF-8" %>
<%
    String username = request.getParameter("username");
    
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    
    try {
        Class.forName("com.mysql.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/bishe", "root", "123456");
        
        String sql = "SELECT * FROM users WHERE username = ?";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, username);
        rs = pstmt.executeQuery();
        
        if (rs.next()) {
            out.print("{");
            out.print("\"success\": true,");
            out.print("\"username\": \"" + rs.getString("username") + "\",");
            out.print("\"email\": \"" + rs.getString("email") + "\",");
            out.print("\"phone\": \"" + rs.getString("phone") + "\"");
            out.print("}");
        } else {
            out.print("{\"success\": false, \"message\": \"用户不存在\"}");
        }
    } catch(Exception e) {
        out.print("{\"success\": false, \"message\": \"服务器错误\"}");
        e.printStackTrace();
    } finally {
        if (rs != null) rs.close();
        if (pstmt != null) pstmt.close();
        if (conn != null) conn.close();
    }
%>