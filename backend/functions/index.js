import functions from "firebase-functions";
import express from "express";
import admin from "firebase-admin";
import validateEmailandPassword from "./express/middleware/validate-email-and-password.js";
import firebaseConfig from "./firebase.config.js";
import pkg from "firebase-admin";
const { initializeApp } = pkg;
import cors from "cors";
import morgan from "morgan";
import serviceAccount from "./service-account-key.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

import register from "./express/routes/register.js";
import login from "./express/routes/login.js";
import firebaseAuth from "./express/middleware/firebase-auth.js";
import getUser from "./express/routes/get-user.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.post("/login", validateEmailandPassword, login);
app.post("/register", validateEmailandPassword, register);
app.get("/users/:id", firebaseAuth, getUser);

export const api = functions.https.onRequest(app);
