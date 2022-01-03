# node-express-api-starter

NodeJs / Express web API for templating web services

## PREREQUISITES

- Install Node and NPM
- Install node packages: "npm install"

## EXECUTING

- npm start

or

- npm run dev (run locally)

## ENVIRONMENTS

- The environment get set by the variable: "NODE_ENV".
- Different configuration settings can be set in ./src/config/[ENVIRONMENT].json
- Default config will be used first, then environment configs overrule.
- Possible environments are: dev, production
- If running nodemon, create a nodemon.json file and set the environment variable

```
{
  "env": {
    "NODE_ENV": "dev"
  }
}
```

## TOUBLESHOOTING

### Kill open connections if the port has been left running by a previous instance

```
lsof -i:3001
kill -9 [PID]
```

## Docker Commands

docker build -t <username>/<image-name> .
docker run -it -d -p80:3001 <username>/<image-name>
docker tag <username>/<image-name> <username>/<image-name>:v1
docker push <username>/<image-name>:v1
docker ps
docker inspect <container-id>
docker logs <container-id>
docker stop <container-id>
docker-compose up --build
