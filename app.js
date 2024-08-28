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

app.get("/foods", (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  res.render("foods", {
    foodInformations: foodInformations,
  });
});

app.get("/meals", (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  const meals = mealsRepo.getAllMeals();

  res.render("meals", {
    foodInformations,
    meals,
  });
});

app.post("/meals", (req, res, next) => {
  const foodInformations = foodInformation.foodInformations;

  const { "food-id": foodId, "food-quantity": foodQuantity } = req.body;
  const foodInfo = foodInformations.find(foodInfo => foodInfo.id === foodId);

  if (foodInfo) {
    res.status(400).render("meals");
  }

  const meals = mealsRepo.getAllMeals();
  meals.push({ food: foodInfo.name, foodQuantity: foodQuantity });
  mealsRepo.saveAllMeals(meals);

  res.status(200).render("meals", { foodInformations, meals });
});

app.listen(port, () => {
  console.info(`Express app running on http://localhost:${port}`);
});
