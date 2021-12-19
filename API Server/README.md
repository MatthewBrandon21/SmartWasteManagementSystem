# Smart Waste Management System API
### <i>!!This app created using NodeJS and ExpressJS</i>

#

## Features:
- Store sensor data trash from node gateway to database
- Authentication user with JWT and have 2 user role (admin & employee, each user role have different privilege)
- CRUD user
- CRUD trashdata

#

## Library Dependencies
- @hapi/joi = Validation request input
- bcrypt.js = Hashing bcrypt algorithm
- cors = Middleware for ExpressJS for HTTP header based
- dotenv = Make and use .env file
- express.js = HTTP framwork for NodeJS
- jsonwebtoken = untuk authentukasi dan authorisasi
- mongoose = Framework to use MongoDB database
- nanoid = MongoDB ObjectID generator. Shortener objectID length.
- nodemon : Development tool for auto restarting NodeJS 

#

## Demo app:
You can access this demo API to https://smartwastemanagement-api.herokuapp.com/

#

## How to use this project ?
If you want reverse engineering this project app:
1. Clone this folder
2. Make MongoDB database with users and trashdatas collection (You can see example on JSON Database/ .json).
2. Set url mongoDB database in config/db.config.js
3. set port according to your system port availability in app.js 
4. Run npm install
5. Run npm run

How to use API:
1. You must register first, use register POST method
2. Login with account that you have created, use login POST method
3. In the login response there is a JWT token that will expire in 1 hour
4. Copy and paste that JWT token as POST method header, Header key named "auth-token" with value JWT token

<i>if need help, feel free to contact us! MatthewBrandon21 / rellpa.</i>

#

## API Documentation
Trash data API ( /trashdata):
- router.get("/",trashdata.findAll);  -> Get all trash data

- router.post("/", trashdata.create); -> Make new trash data (use json body on http request)

- router.get("/:id", trashdata.findOne); -> Get trash data by id

- router.put("/:id", trashdata.update); -> Update trash data by id (use json body on http request)

- router.delete("/:id",trashdata.delete); -> Delete trash data by id

API User :
- router.get("/", users.findAll); -> Get all users
 
- router.get("/:id", users.findOne); -> Get a user by id

- router.put("/:id", users.update); -> Update user by id (use json body on http request)
 
- router.delete("/:id", users.delete); -> Delete user by id
 
- router.post("/register", async (req, res) => { function goes here } -> Register user
 
- router.post("/login", async (req, res) => { function goes here } -> Login user

#

### <i>*For improvement<i/>
You can add authentication for device (ESP32 HTTP POST)