const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const validateEmailAndPassword = require("./express/middleware/validate-email-and-password");
const firebaseConfig = require("./firebase.config");
const { initializeApp } = require("firebase/app");
const cors = require("cors");
const morgan = require("morgan");
const serviceAccount = require("./service-account-key.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

const register = require("./express/routes/register");
const login = require("./express/routes/login");
const firebaseAuth = require("./express/middleware/firebase-auth");
const getUser = require("./express/routes/get-user");
const addInternship = require("./express/routes/add-internship");
const getInternships = require("./express/routes/get-internships");

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.post("/login", validateEmailAndPassword, login);
app.post("/register", validateEmailAndPassword, register);
app.post("/add-internship", addInternship);
app.get("/users/:id", firebaseAuth, getUser);
app.get("/get-internships/:email", getInternships);

exports.api = functions.https.onRequest(app);
