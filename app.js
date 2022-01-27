require('dotenv').config();
require('./config/passport');
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const transactionRoute = require('./routes/transactionRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Create User Route 
app.use('/users', userRoute);
// Create Transaction Route
app.use('/transactions', transactionRoute);

app.use((req, res) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server running on port ${port}`))