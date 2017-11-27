# CMS Client App Template

## Development Setup

Requires access to running web api, expects json according to http://jsonapi.org/ spec
API requests default to 'http://localhost:3003/' in session.service.ts

```
npm install -g @angular/cli
npm install
npm start
```

## Deployment

Requires installed aws cli (https://aws.amazon.com/cli/)

Customize script in ./bin/deploy then run:

```
npm run deploy
```
