const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
})

//get method 
//http://localhost:1150/sayhi
//result 
//Hi
app.get('/sayhi', (req, res) => {
    res.send('Hi');
})

//get method and return value
//http://localhost:1150/sayhi/john
//result 
//Hi : john
app.get('/sayhi/:name', (req, res) => {
    res.send(`Hi : ${req.params.name}`);
})

//get method and return 2 values
//http://localhost:1150/sayhi/john/wick
//result
//Hi : john , wick
app.get('/sayhi/:firstname/:lastname', (req, res) => {
    res.send(`Hi : ${req.params.firstname} , ${req.params.lastname}`);
})

//get method and search by name
//http://localhost:1150/product?name=macbook&price=10
//result
//This macbook is 10 baht.
app.get('/product/', (req, res) => {
    res.send(`This ${req.query.name} is ${req.query.price} baht.`);
})



const PORT = process.env.PORT || 1150

app.listen(PORT, () => {
    const env = `${process.env.NODE_ENV || 'development'}`
    console.log(`App listening on port ${PORT}`);
    console.log(`App listening on port ${env}`);
    console.log(`Press Ctrl+C to quit.`);
})