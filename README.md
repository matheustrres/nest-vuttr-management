# VUTTR Managament

A simple application to manage tools with their respective names, links, descriptions, and tags.

## ⚒ Used technologies:

- Node.js
- Typescript
- Nestjs
- Docker
- TypeORM
- PostgreSQL
- OpenAPI Swagger
- Clean Code, Clean Architecture

## 💻 Running the project locally

First clone the project on your computer and enter the created directory: 

```bash
git clone https://github.com/matheustrres/nest-vuttr-management.git
cd nest-vuttr-management
```

Install the application dependencies

```bash
npm install
```    

Set the environment variables correctly in the .env file

```env
NODE_ENV=

PG_DATABASE=vuttr_db
PG_PASSWORD=postgres
PG_PORT=5432
PG_HOST=localhost
PG_USERNAME=postgres
```

Initialize the database service with docker

```bash
docker-compose up
```

Start the server from your terminal

```bash
npm run start
```

## 🚩 API Documentation

To view the API documentation with OpenAPI Swagger, after you have started the server properly with `npm run start:dev`, go to **http://localhost:3000/api** to check it out.

## 🎲 Features

- Tool
    - [x]  Creation
    - [x]  Deletion
    - [x]  Listing with pagination
    - [x]  Search by id

- User
    - [x]  Creation
    - [x]  Authentication
    - [ ]  Updating
