# Use an official OpenJDK image as a base image
FROM openjdk:11-jdk

# Install SBT
RUN apt-get update && apt-get install -y curl gnupg && \
    echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list && \
    curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x99E82A75642AC823" | apt-key add && \
    apt-get update && apt-get install -y sbt

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Default command to run SBT (change this to sbt run if you want to auto-run the app)
CMD ["sbt"]

