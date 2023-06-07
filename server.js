import  express  from "express";
import dotenv from "dotenv";
import colors from 'colors';


// congigure env
dotenv.config()

// port
const PORT = process.env.PORT || 8080;

// rest object
const app = express()

//rest api
app.get('/', (req, res) => {
  res.send("<h1>HEllo</h1>")
})

//run listen 
app.listen(PORT, () => {
  console.log('server running on '.bgCyan.bold + process.env.DEV_MODE .bgBlue.bold + " mode on: " + PORT .bgCyan.white);
})