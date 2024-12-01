const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');
const usersRoutes = require("./routes/users")
const employeeRoutes = require("./routes/employee")
const mongoose = require("mongoose")

const DB_CONNECTION_STRING = "mongodb+srv://justinyeh13:GBC13gbc!@cluster0.ifuyg.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

const app = express();

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

app.use(express.json())
app.use(express.urlencoded())

app.use(express.urlencoded({extended: true}));

app.use("/api/v1", usersRoutes)
app.use("/api/v1", employeeRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MongoDB + Mongoose Example</h1>")
    })

// Error Handler
const errorHandler = (err, req, res, next) => {
    res.status(500).send({status: false, message: err.message});
}
app.use(errorHandler);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Serve the React app (production setup)
app.use(express.static(path.join(__dirname, '../client/build')));

// Start React app in development mode
const startReactApp = () => {
  exec('npm start --prefix ./client', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting React app: ${err.message}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
};

// Start the React app
startReactApp();

// Define API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

