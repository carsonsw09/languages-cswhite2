import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json._
import scala.io.StdIn
import scala.io.Source

// Case class to represent the list of strings in JSON
final case class StringList(strings: List[String])

// JSON format for the case class
trait JsonSupport extends DefaultJsonProtocol {
  implicit val stringListFormat = jsonFormat1(StringList)
}

object HelloWorldServer extends JsonSupport {

  def main(args: Array[String]): Unit = {
    // Create an ActorSystem
    implicit val system = ActorSystem(Behaviors.empty, "helloWorldSystem")
    implicit val executionContext = system.executionContext

    // Define the routes
    val route =
      path("greet" / Segment) { person =>
        get {
          complete(s"Hello, $person!")
        }
      } ~
      pathSingleSlash {
        get {
          complete(s"Hello!")
        }
      } ~
      path("sortStringsFromFile") {
        get {
          // Use the correct path to the JSON file
          val jsonFile = Source.fromFile("src/main/scala/strings.json").getLines.mkString
          val stringList = jsonFile.parseJson.convertTo[StringList] // Parse JSON into StringList
          val sortedStrings = stringList.strings.sorted             // Sort the list of strings
          complete(StringList(sortedStrings))                       // Return the sorted list as JSON
        }
      }

    // Start the server
    val bindingFuture = Http().newServerAt("0.0.0.0", 8080).bind(route)

    println("Server online at http://localhost:8080/\nPress RETURN to stop...")
    StdIn.readLine() // Keep the server running until user presses return
    bindingFuture
      .flatMap(_.unbind()) // Unbind from the port
      .onComplete(_ => system.terminate()) // Terminate the system when done
  }
}
