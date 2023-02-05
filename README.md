<p align="center">
  <a href="https://www.getgreenspark.com/" target="blank">
    <img src="https://uploads-ssl.webflow.com/611391a1477389e3857d8014/6121384709033a5f2461b91c_favicon-256.png" width="180" alt="Greenspark Logo" />
    <h2 align="center">Greenspark</h2>
  </a>
    <h3 align="center">Powerful climate action made easy</h3>
    <h5 align="center" style="margin-bottom: 60px">Join a global movement creating positive impact every day.</h5>
</p>

-----

# [Greenspark Widget Editor (backend)](https://github.com/MatraiMilan/greenspark-widget-be)

## Description

Backend service for [Greenspark Widget Editor (frontend)](https://github.com/MatraiMilan/greenspark-widget-fe)

-----

## Installation

```bash
$ npm install
```

## Edit the [configuration file](src/config/configuration.ts)

```
export default () => ({
    frontendUrl: <frontend url>, // default: 'http://localhost:5173',
    port: <localhost port to run>, // default: 3000
});
```

----

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

----

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
