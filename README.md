# noe_project_insight_nodejs_back

> Project insight - nodeJS AW EISI 21.1

## Description

This API allows :
+ students to rate their teacher's modules 
+ administrators to create, read, update and delete sessions or modules or users. They can see the average sessions scores too.
+ contributors to read their students notes given on their modules.

## URL
```
127.0.0.1:3000
```

## Launch your docker container
```
docker-compose up (with live logs)
docker-compose up -d (in background, you can later on show logs with `docker-compose logs -f`)
```

## Access to the node container to add dependencies
```
docker exec -ti project_node bash
npm install 'DEPENDANCY'
```

## Set your environment variables
```
Rename the .env.sample file to .env and insert your values
```
+ GUEST_JWT_KEY
+ ADMIN_JWT_KEY
+ DB_NAME (insert test if you want to use mocked datas from mongo/mongo-init.js)
 ######ps: To signup an admin user you must refer the ADMIN_JWT_KEY as a POST in a admin_code property
