// dependencies
const express = require("Express");
const mongoose=require("Mongoose")
const bodyParser = require("Body-parser");
var cors = require('cors')
const app = express();

//port
const port = process.env.PORT || 3000;

// local dependices 
const user = require('./routes/users');
// const customer = require('./routes/customers');
// const order = require('./routes/orders');
// const productOrder = require('./routes/productOrders');
// const product = require('./routes/products');
// const sale = require('./routes/sales');
// const shopkeeper = require('./routes/shopkeepers');
// const shop = require('./routes/shops');
// const wishlist = require('./routes/Wishlists');
// const vmProduct = require('./routes/vmProducts');
// const vmCategory = require('./routes/vmCategories');
// const payment = require('./routes/payments');


//setting up body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
//setting up cors
app.use(cors())

//app.use(express.static(__dirname + ''))

// /*user defined routes */ 
// app.use('/customer',customer);
// app.use('/order',order);
// app.use('/productOrder',productOrder);
// app.use('/product',product);
// app.use('/sale',sale);
// app.use('/shopkeeper',shopkeeper);
// app.use('/shop',shop);
app.use('/user',user);
// app.use('/wishlist',wishlist);
// app.use('/vmproduct',vmProduct);
// app.use('/vmcategory',vmCategory);
// app.use('/payment',payment);


//mongoose connection string
mongoose.connect("mongodb://root:root4644@ds017678.mlab.com:17678/mms").then(
	() => {
	console.log("DB connected..!!!");	
	},
	err => {
	console.log("ERROR IN \"DB CONNECTIVITY\" : "  + err);
});

//running server
app.listen(port, ()=>{
	console.log('Server started on \"PORT\" => '+ port)
})