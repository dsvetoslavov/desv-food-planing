const express = require("express");
const handlebars = require("express-handlebars");
const mealInformation = require("./meal-information.js");

const port = 3000;

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  const foodInformations = mealInformation.foodInformations;
  
  res.render("home", {
    foodInformations: foodInformations, 
  });
});

app.listen(port, () => {
  console.info(`Express app running on http://localhost:${port}`);
});
