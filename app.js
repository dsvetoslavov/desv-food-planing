const express = require("express");
const handlebars = require("express-handlebars");
const foodInformation = require("./food-information.js");
const mealInformation = require("./meal-information.js");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const port = 3000;
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

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

app.get("/meals", async (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  let meals = [];
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("desv-food-planing");
    const collection = db.collection("meals");
    meals = await collection.find().toArray();
  } finally {
    await client.close();
  }

  res.render("meals", {
    foodInformations,
    meals,
  });
});

app.post("/meals", async (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  const { "meal-name": name, foods } = req.body;
  const mealFoods = foods.map((food) => {
    return {
      foodId: food.id,
      quantity: food.quantity,
      foodInfo: foodInformations.find((foodInfo) => foodInfo.id === food.id),
    };
  });

  const meal = {
    name,
    mealFoods,
    macros: mealInformation.getMealMacros(
      mealFoods.map((food) => ({
        id: food.foodId,
        portionInGramms: food.quantity,
      })),
      foodInformations
    ),
  };

  if (mealFoods.some((mealFood) => !mealFood.foodId)) {
    res.status(400).render("meals");
  }

  let meals = [];
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("desv-food-planing");
    const collection = db.collection("meals");

    await collection.insertOne(meal);

    meals = await collection.find({}).toArray();
  } finally {
    await client.close();
  }

  res.status(200).render("meals", { foodInformations, meals });
});

app.get("/day-plans", async (req, res) => {
  const foodInformations = foodInformation.foodInformations;

  let meals = [];
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("desv-food-planing");
    const collection = db.collection("meals");
    meals = await collection.find().toArray();
  } finally {
    await client.close();
  }

  res.render("day-plans", {
    meals,
  });
});

app.listen(port, () => {
  console.info(`Express app running on http://localhost:${port}`);
});
