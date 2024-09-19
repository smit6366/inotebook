const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

const corsOptions = {
  origin: '*',  // This allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,  // Must be false if origin is '*'
  optionsSuccessStatus: 204
};

app.use(cors())
app.use(express.json(corsOptions))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})