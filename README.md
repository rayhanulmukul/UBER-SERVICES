<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A microservices-based ride-sharing application built with NestJS, featuring a logging service for tracking rider coordinates and a rider microservice for managing rider information.

## Architecture

This project consists of three main applications:

### 1. Logging Service (Port 3002)
- **REST API** for managing rider coordinates
- Stores coordinate data in MongoDB
- Communicates with Rider microservice via TCP
- Endpoints:
  - `GET /rider-coordinates/:id` - Get rider info and their coordinates
  - `POST /rider-coordinates` - Save new rider coordinates

### 2. Rider Microservice (Port 3001)
- **TCP-based microservice** for rider data
- Provides rider information to other services
- Message Pattern: `{ cmd: 'getRiderByID' }`

### 3. UBER-SERVICES
- Main application entry point

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (via Docker)

## Project Setup

```bash
# Install dependencies
$ npm install
```

## Database Setup

Start MongoDB using Docker Compose:

```bash
# Start MongoDB container
$ docker compose up -d mongo
```

MongoDB will be available at `localhost:27017` with credentials:
- Username: `root`
- Password: `root`

## Running the Applications

```bash
# Start Logging Service (port 3002)
$ npm run start:dev logging

# Start Rider Microservice (port 3001)
$ npm run start:dev rider

# Start main UBER-SERVICES
$ npm run start:dev UBER-SERVICES
```

## API Usage

### Testing with REST Client

Use the `rest.http` file with VS Code REST Client extension:

```http
### Get Rider Coordinates
GET http://localhost:3002/rider-coordinates/rider123

### Post Rider Coordinates
POST http://localhost:3002/rider-coordinates
Content-Type: application/json

{
  "lat": 37.7749,
  "lng": -122.4194,
  "rider": "rider123"
}
```

### Testing with cURL

```bash
# Get rider coordinates
$ curl http://localhost:3002/rider-coordinates/rider123

# Create new coordinates
$ curl -X POST http://localhost:3002/rider-coordinates \
  -H "Content-Type: application/json" \
  -d '{"lat": 37.7749, "lng": -122.4194, "rider": "rider123"}'
```

## Project Structure

```
apps/
├── logging/                  # Logging Service (REST API)
│   └── src/
│       ├── rider-coordinates/
│       │   ├── dto/
│       │   ├── schemas/
│       │   ├── rider-coordinates.controller.ts
│       │   ├── rider-coordinates.service.ts
│       │   └── rider-coordinates.module.ts
│       └── main.ts
├── rider/                    # Rider Microservice (TCP)
│   └── src/
│       ├── rider.controller.ts
│       ├── rider.service.ts
│       ├── rider.module.ts
│       └── main.ts
└── UBER-SERVICES/           # Main Application
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **MongoDB** - Document database with Mongoose ODM
- **Microservices** - TCP-based inter-service communication
- **TypeScript** - Type-safe development
- **Docker** - Containerization

## Run Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
