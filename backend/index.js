const express = require('express');
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