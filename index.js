const express=require('express');
const app=express();    
const mongoose=require('mongoose');
const port=process.env.PORT || 3000;
const path=require('path');
mongoose.connect('mongodb+srv://user:Password9080@cluster0.xguxfjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Database connection error:', err);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static("public/index.html"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
});
const User=mongoose.model('User', userSchema);
 

app.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);  

        console.log('Received name:', user.name); 

        await user.save();
        res.status(201).send({ message: 'Success', user });
    } catch (error) {
        console.error('Save error:', error.message);
        res.status(400).send({ message: 'User Already Exist or Invalid Data' });
    }
});

app.listen(3000, () => {
    console.log(`Server is running on port localhost:${port}`);
});