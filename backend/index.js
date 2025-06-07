// Importing express
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');

// Express App
const app = express();

const PORT = 5000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/user', UserRouter);

// Routing
app.get('/', (req, res) => {
    res.send('Response from Express');
});

app.get('/add', (req, res) => {
    res.send('Response from Add Route');
});

let products = [
    {
        group: "Chikankari Kurtas",
        products: [
            {
                title: "Handcrafted White Kurta",
                image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
                price: 1299,
                description: "Beautifully embroidered by young artisans."
            }
        ]
    }
];

app.get('/api/products', (req, res) => {
    res.json({ groups: products });
});

app.post('/api/products', (req, res) => {
    const { group, product } = req.body;
    let groupObj = products.find(g => g.group === group);
    if (groupObj) {
        groupObj.products.push(product);
    } else {
        products.push({ group, products: [product] });
    }
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log("Server is running on port - " + PORT);
})