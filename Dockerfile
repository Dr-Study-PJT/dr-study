#FROM bellsoft/liberica-openjdk-alpine:17
#
#CMD ["./gradlew", "clean", "build"]
#
#ARG JAR_FILE=build/libs/*.jar
#
#COPY ${JAR_FILE} app.jar
#
#EXPOSE 8080
#
#ENTRYPOINT ["java","-jar","/app.jar"]

## Use a base image with OpenJDK 17
#FROM bellsoft/liberica-openjdk-alpine:17
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the entire project to the working directory
#COPY . .
#
## Make Gradle wrapper executable
#RUN chmod +x ./gradlew
#
## Run the Gradle build
#RUN ./gradlew clean build
#
## Copy the JAR file to the container
#COPY build/libs/app.jar app.jar
#
## Expose port 8080 (the application will run on this port inside the container)
#EXPOSE 8081
#
## Run the application
#ENTRYPOINT ["java", "-jar", "/app.jar"]



# Use a base image with OpenJDK 17
#FROM bellsoft/liberica-openjdk-alpine:17

# Set the working directory inside the container
#WORKDIR /app

# Copy the entire project to the working directory
#COPY . .

# Make Gradle wrapper executable
#RUN chmod +x ./gradlew

# Run the Gradle build
#RUN ./gradlew clean build

# Copy the JAR file to the container
# Ensure that the JAR file path is correct after the build
#COPY build/libs/*.jar app.jar

# Expose port 8081 (the application will run on this port inside the container)
#EXPOSE 8081

# Run the application
#ENTRYPOINT ["java", "-jar", "/app.jar"]




# Base image
FROM bellsoft/liberica-openjdk-alpine:17

# Set working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Run Gradle build
RUN ./gradlew clean build

RUN ls -al ./build/libs

RUN cp ./build/libs/doctor-study-0.0.1-SNAPSHOT.jar app.jar

#RUN ls -al ./build/libs

# RUN ls -al ./build/lib/
# Specify the JAR file location

# ARG JAR_FILE=./build/libs/*.jar

# Copy the JAR file to the container
# COPY ${JAR_FILE} app.jar

# Expose the application port
EXPOSE 8080

#cmd ["cd", "./build/libs"]

#cmd ["pwd"]

cmd ["java", "-jar", "app.jar"]
# Run the application
# ENTRYPOINT ["java", "-jar", "/app.jar"]










