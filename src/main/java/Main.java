import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;

import static java.lang.System.out;
import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class Main extends DriverAccessor {
  public static void main(String[] args) throws URISyntaxException {
    // initDB();
    out.println("Hello");
    String url = "http://0.0.0.0:3000";
    String qq = "";
    IO.Options options = new IO.Options();
    options.transports = new String[]{"websocket"};
    options.reconnectionAttempts = 10;
    options.reconnectionDelay = 1000;
    options.timeout = 500;
    final Socket socket = IO.socket(url, options);

    socket.on("OnEvents", objects ->
        System.out.println(Arrays.toString(objects))
    );

    socket.connect();
  }

  public static void initDB() {
    try {
      Connection con = createConnection();

      String sql = "create table if not exists memo("
          + "id varchar(16) PRIMARY KEY NOT NULL"
          + "doc varchar(225) NOT NULL);";

      PreparedStatement stmt = con.prepareStatement(sql);
      stmt.executeUpdate();
      stmt.close();
    }catch (SQLException e){
      out.println("foo");
    }finally {
      out.println("bar");
    }
  }
}
