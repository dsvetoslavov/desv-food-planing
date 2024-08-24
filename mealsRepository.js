const fs = require("fs");

const mealsFile = "./meals.json";

function createMealsFileIfNotExists() {
  if (!fs.existsSync(mealsFile)) {
    fs.writeFileSync(mealsFile, "[]");
  }
}

function getAllMeals() {
  createMealsFileIfNotExists();

  const mealsRaw = fs.readFileSync(mealsFile);
  return JSON.parse(mealsRaw);
}

function saveAllMeals(meals) {
  createMealsFileIfNotExists();

  fs.writeFileSync(mealsFile, JSON.stringify(meals));
}

module.exports.getAllMeals = getAllMeals;
module.exports.saveAllMeals = saveAllMeals;
