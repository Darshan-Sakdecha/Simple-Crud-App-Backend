import express from 'express'
import mongoose from 'mongoose';
// import Product from './models/product.model.js';
import { productRouter } from './routes/product.route.js';
const app = express();
// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/products', productRouter);

app.get('/home', (req, res) => {
    res.send("get home");
})



mongoose.connect("mongodb+srv://darshansakdecha:darshan123@cluster0.ssyrqmi.mongodb.net/Node_Crud")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    })
    .catch(() => {
        console.log("Connection Failed!");
    })

