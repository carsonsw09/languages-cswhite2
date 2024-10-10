ThisBuild / scalaVersion := "2.13.12"

// Include other dependencies as needed
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.19",
  "com.typesafe.akka" %% "akka-http" % "10.2.9",
  "com.typesafe.akka" %% "akka-stream" % "2.6.19",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.10"//Akka HTTP JSON support
)

// Specify the main class if sbt is not detecting it
mainClass in Compile := Some("HelloWorldServer")

