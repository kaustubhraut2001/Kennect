const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const posts = require('./routes/post');
dotenv.config();
const users = require("./routes/user");
const app = express();
const cors = require("cors");

app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Define Post Schema
// const PostSchema = new mongoose.Schema({
//     user: String,
//     message: String,
//     comments: [{
//         user: String,
//         message: String
//     }],
//     createdAt: { type: Date, default: Date.now }
// });

// const Post = mongoose.model('Post', PostSchema);

app.use(bodyParser.json());

// Create a new post
app.use('/posts', posts);
app.use("/users", users);
// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));