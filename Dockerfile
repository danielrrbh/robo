FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/gestaoemprestimos-2.0.jar
COPY ${JAR_FILE} gestao.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/gestao.jar"]
RUN mkdir -p /consultas
RUN chmod 777 -R /consultas


