# Use Amazon Corretto 17 as the base image
FROM amazoncorretto:17

# Metadata as described above
LABEL authors="HOME"

# Copy the JAR into the image
COPY /back-end/target/back-end-1.0.0.jar /app/back-end-1.0.0.jar

# Specify the entrypoint to run your application
ENTRYPOINT ["java", "-jar", "/app/back-end-1.0.0.jar"]
