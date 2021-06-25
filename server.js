const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: ['http://example.com','https://www.w3schools.com','http://localhost:4200'],
    optionsSuccessStatus:200
}

//swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

// Add headers
app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});

//middle ware (use images)
app.use('/api/images', express.static('images'))
//middle ware (cors allow all connection)
//app.use(cors(corsOptions))
//middle ware (Content-Type => application/json)
app.use(express.json())
//middle ware (Content-Type => application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false })) //extended: true => nested data structure => {xxx : {yyy : zzz}}

//use authen_controller
app.use('/api/authen', require('./controller/authen_controller'))

//use product_controller 
app.use('/api', require('./controller/product_controller'))
//use company_controller
app.use('/api', require('./controller/company_controller'))
//use employee_controller
app.use('/api', require('./controller/employee_controller'))

const PORT = process.env.PORT || 1150

app.listen(PORT, () => {
    const env = `${process.env.NODE_ENV || 'development'}`
    console.log(`App listening on port ${PORT}`);
    console.log(`App listening on port ${env}`);
    console.log(`Press Ctrl+C to quit.`);
})

//config for swagger
const options = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ],
    },
    apis : ["./controller/*.js"]
};

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))