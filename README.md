# noe_project_insight_back

> Project insight - nodeJS AW EISI 21.1

## Description

This API allows :
+ students to rate their teacher's modules 
+ administrators to create, read, update and delete sessions or modules or users. They can see the average sessions scores too.
+ contributors to read their students notes given on their modules.

## Base URL to api
```
localhost:3000
OR
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
npm install 'DEPENDENCY'
```

## Set your environment variables
```
Rename the .env.sample file to .env and insert your values
```
+ GUEST_JWT_KEY
+ ADMIN_JWT_KEY (Also used to create an admin user)
+ DB_NAME (insert `test` if you want to use mocked datas from mongo/mongo-init.js)

##### To signup an admin user you must refer the ADMIN_JWT_KEY as a POST in a admin_code property aswell with the following ones :
+ `nom`
+ `prenom`
+ `role` ['etudiant', 'intervenant', 'admin']
+ `pseudo` (ps: if no pseudo is given, the result will be `prenom.nom`
+ `password`
+ `admin_code` (optional: ADMIN_JWT_KEY)

# The application using this api is available here : https://github.com/noeklk/noe_project_inside_front
Here is a few requirements to use the application with this api

- You must run both the api and application on the same environment
  + Use `docker-compose up` for both then navigate to `localhost:4200` OR `127.0.0.1:4200`
  + Then if you used mocked datas by entering `test` into the `DB_NAME` environment key, you should be able to login the application with :
   
Pseudo | Password | Role
--- | --- | ---
admin | admin | admin
etudiant1 | etudiant1 | etudiant
intervenant1 | intervenant1 | intervenant
    
# Also
All routes are protected by token verification (10mn validity), so you must at least login with either a guest or admin account to use any of them.
> Postman Collection: https://textup.fr/403649uC OR https://www.transfernow.net/ddl/postman-json-noe
