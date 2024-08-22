const express = require("express");
const handlebars = require("express-handlebars");
const mealInformation = require("./meal-information.js");
const fs = require("fs");

const port = 3000;

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded());

app.get("/", (req, res) => {
  const foodInformations = mealInformation.foodInformations;

  res.render("home", {
    foodInformations: foodInformations,
  });
});

app.get("/new-meal", (req, res) => {
  const foodInformations = mealInformation.foodInformations;

  res.render("new-meal", {
    foodInformations,
  });
});

app.post("/new-meal", (req, res, next) => {
  const foodInformations = mealInformation.foodInformations;

  console.log(req.body.food);
  console.log(req.body["food-quantity"]);

  if (!fs.existsSync("./meals.json")) {
    fs.writeFileSync('./meals.json', '[]');
  }

  const mealsRaw = fs.readFileSync("./meals.json");
  const meals = JSON.parse(mealsRaw);
  console.log(meals);

  res.status(200).render("new-meal", { foodInformations });
});

app.listen(port, () => {
  console.info(`Express app running on http://localhost:${port}`);
});
