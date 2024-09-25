const express = require("express");
const handlebars = require("express-handlebars");
const foodInformation = require("./food-information.js");
const mealsRepo = require("./mealsRepository.js");

const port = 3000;

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded());

app.get("/login", (req, res) => {
  res.render("login", { layout: false });
});

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

  const { "meal-name": name, foods } = req.body;
  const mealFoods = foods.map((food) => {
    return {
      foodId: food.id,
      quantity: food.quantity,
      foodInfo: foodInformations.find((foodInfo) => foodInfo.id === food.id),
    };
  });

  const meal = { name, mealFoods };

  if (mealFoods.some((mealFood) => !mealFood.foodId)) {
    res.status(400).render("meals");
  }

  const meals = mealsRepo.getAllMeals();
  meals.push(meal);
  mealsRepo.saveAllMeals(meals);

  res.status(200).render("meals", { foodInformations, meals });
});

app.listen(port, () => {
  console.info(`Express app running on http://localhost:${port}`);
});
