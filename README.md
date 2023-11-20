# iNotebook-Redux

1)	npx create-react-app react-app-name
2)	npm install concurrently
3)	npm install nodemon
4)	"both": "concurrently \"npm run start\" \"nodemon backend/index.js\""
5)	npm install @reduxjs/toolkit
6)	npm install react-redux
7)	npm install react-router-dom
8)	Extension : ES7 React/Redux/GraphQL/React-Native snippets
9)	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
10)	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
11)	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
12)	npm install primereact
13)	npm install primeicons
14)	npm install react-transition-group
15)	import "primereact/resources/themes/lara-light-indigo/theme.css";        
16)	import "primereact/resources/primereact.min.css"; 
17)	npm install react-cookies
18)	const cookies = new Cookies();
19)	  const token = cookies.get("token");
20)	<link rel="stylesheet" href="https://unpkg.com/primeicons@6.0.1/primeicons.css">
21) <Outlet/> : <Navigate to="/login" state={{from : location}} replace/>
22) {
  "name": "inotebook-backend",
  "version": "1.0.0",
  "description": "iNotebook - Your notebook on the cloud",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}
23) const express = require('express');
const app = express();
const port = 5000
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

// json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser. 
app.use(express.json());
// Calling use(cors()) will enable the express server to respond to preflight requests. A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
app.use(cors());

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
24) const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.error("Error connecting to Mongo:", err);
        } else {
            console.log("Connected to Mongo Successfully");
        }
    });
    
}

module.exports = connectToMongo;
25) const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);  
    const data = {
      user: {
        id: user.id,
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    const passwordCompare = await bcrypt.compare(password,user.password);
