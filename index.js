const express=require('express')
const app=express()
const credentials = require('./middleware/credentials');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const PORT=5500;
const dotenv=require('dotenv')
const connectDB=require('./dbConn')
const bodyParser=require('body-parser')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')
dotenv.config()
app.use(credentials);
app.use(cors(corsOptions))
connectDB()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))
app.use('/',require('./routes/movies'))

app.use('*', (req, res) => {
    res.status(404).json({"message": "Not Found"})
  });

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
