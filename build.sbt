name := "scala-docker-app"

version := "0.1"

scalaVersion := "2.13.1"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.2.6",
  "com.typesafe.akka" %% "akka-actor" % "2.6.14",
  "de.heikoseeberger" %% "akka-http-spray-json" % "10.2.6"
)
