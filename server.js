const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: ['http://example.com','https://www.w3schools.com','http://localhost:4200'],
    optionsSuccessStatus:200
}

//middle ware (cors allow all connection)
app.use(cors(corsOptions))
//middle ware (Content-Type => application/json)
app.use(express.json())
//middle ware (Content-Type => application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false })) //extended: true => nested data structure => {xxx : {yyy : zzz}}

//use product_controller 
app.use(require('./controller/product_controller'))

const PORT = process.env.PORT || 1150

app.listen(PORT, () => {
    const env = `${process.env.NODE_ENV || 'development'}`
    console.log(`App listening on port ${PORT}`);
    console.log(`App listening on port ${env}`);
    console.log(`Press Ctrl+C to quit.`);
})