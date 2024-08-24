const express = require("express");
const handlebars = require("express-handlebars");
const foodInformation = require("./food-information.js")
const mealsRepo = require("./mealsRepository.js");

const port = 3000;

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded());

app.get("/", (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  res.render("home", {
    foodInformations: foodInformations,
  });
});

app.get("/new-meal", (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  const meals = mealsRepo.getAllMeals();

  res.render("new-meal", {
    foodInformations,
    meals,
  });
});

app.post("/new-meal", (req, res, next) => {
  const foodInformations = foodInformation.foodInformations;

  const { food, "food-quantity": foodQuantity } = req.body;

  const meals = mealsRepo.getAllMeals();
  meals.push({ food, foodQuantity: foodQuantity });
  mealsRepo.saveAllMeals(meals);

  res.status(200).render("new-meal", { foodInformations, meals });
});

app.listen(port, () => {
  console.info(`Express app running on http://localhost:${port}`);
});
