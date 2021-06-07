const express = require('express');
const app = express();

//middle ware (Content-Type => application/json)
app.use(express.json())
//middle ware (Content-Type => application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false })) //extended: true => nested data structure => {xxx : {yyy : zzz}}
//middle ware (Content-type => multipart/form-data)
var multer = require('multer')
var upload = multer()

//post method (params)
//http://localhost:1150/product/1
//result
//Product id is : 1
app.post('/product/:id',(req, res) => {
    res.send(`Product id is : ${req.params.id}`);
})

//post method (application/json)
//postman CMS_NodeJS http://localhost:1150/productJSON/1
//result
//{ name: 'macbook', price: 10, stock: 999 }
app.post('/productJSON/:id',(req, res) => {
    console.log(req.body);
})

//post method (application/x-www-form-urlencoded)
//postman CMS_NodeJS http://localhost:1150/productFormUrl/1
//result
//[Object: null prototype] {
//    name: 'macbook',
//    price: '999',
//    stock: '777'
// }
app.post('/productFormUrl/:id',(req, res) => {
    console.log(req.body);
})

//post method (multipart/form-data)
//postman CMS_NodeJS http://localhost:1150/productMutipart/1
//result
//[Object: null prototype] {
//     name: 'macbook',
//     price: '1234',
//     stock: '9874'
//   }
app.post('/productMutipart/:id',upload.none(),(req, res) => {
    console.log(req.body);
})


const PORT = process.env.PORT || 1150

app.listen(PORT, () => {
    const env = `${process.env.NODE_ENV || 'development'}`
    console.log(`App listening on port ${PORT}`);
    console.log(`App listening on port ${env}`);
    console.log(`Press Ctrl+C to quit.`);
})