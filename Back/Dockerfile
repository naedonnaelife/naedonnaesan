# jdk 11 사용
FROM openjdk:11-jdk

# jar파일 위치가 build/libs/*.jar
COPY build/libs/Back-0.0.1-SNAPSHOT.jar app.jar

# 실행하기
ENTRYPOINT ["java","-Dspring.profiles.active=docker", "-jar","app.jar"]