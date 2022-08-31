FROM node:17-alpine
WORKDIR /dotinhaTest
COPY . .
EXPOSE 3000
CMD ["node","index"]