const foodInformations = [
  {
    name: "Oats",
    carbsPer100g: 68,
    proteinPer100g: 13,
    fatPer100g: 7,
    calories: 389,
  },
  {
    name: "Protein Powder",
    carbsPer100g: 5,
    proteinPer100g: 80,
    fatPer100g: 5,
    calories: 400,
  },
  {
    name: "Chocolate (dark, 70-85% cocoa)",
    carbsPer100g: 46,
    proteinPer100g: 8,
    fatPer100g: 43,
    calories: 600,
  },
  {
    name: "Banana",
    carbsPer100g: 23,
    proteinPer100g: 1.1,
    fatPer100g: 0.3,
    calories: 96,
  },
  {
    name: "Chicken Breast (cooked, skinless)",
    carbsPer100g: 0,
    proteinPer100g: 31,
    fatPer100g: 4,
    calories: 165,
  },
  {
    name: "Pork Ribs (cooked)",
    carbsPer100g: 0,
    proteinPer100g: 26,
    fatPer100g: 29,
    calories: 361,
  },
  {
    name: "Rice (white, cooked)",
    carbsPer100g: 79,
    proteinPer100g: 7.1,
    fatPer100g: 0.6,
    calories: 365,
  },
  {
    name: "Olive Oil",
    carbsPer100g: 0,
    proteinPer100g: 0,
    fatPer100g: 100,
    calories: 884,
  },
  {
    name: "Peanut Butter",
    carbsPer100g: 20,
    proteinPer100g: 25,
    fatPer100g: 50,
    calories: 588,
  },
  {
    name: "Cream Rice",
    carbsPer100g: 79,
    proteinPer100g: 6.6,
    fatPer100g: 0.6,
    calories: 348,
  },
  {
    name: "Cashews (raw)",
    carbsPer100g: 30,
    proteinPer100g: 18,
    fatPer100g: 44,
    calories: 553,
  },
  {
    name: "Skyr (plain)",
    carbsPer100g: 4,
    proteinPer100g: 11,
    fatPer100g: 0.2,
    calories: 64,
  },
  {
    name: "Bulgarian yogurt",
    carbsPer100g: 4.2,
    proteinPer100g: 3.7,
    fatPer100g: 4.5,
    calories: 72,
  },
  {
    name: "Almonds (raw)",
    carbsPer100g: 22,
    proteinPer100g: 21,
    fatPer100g: 50,
    calories: 579,
  },
  {
    name: "File Elena",
    carbsPer100g: 1,
    proteinPer100g: 40,
    fatPer100g: 2,
    calories: 193,
  },
  {
    name: "Cottage Cheese",
    carbsPer100g: 3,
    proteinPer100g: 12.5,
    fatPer100g: 4.5,
    calories: 103,
  },
  {
    name: "Bread",
    carbsPer100g: 39,
    proteinPer100g: 9,
    fatPer100g: 1.4,
    calories: 222,
  },
  {
    name: "Flax Seed",
    carbsPer100g: 29,
    proteinPer100g: 18.3,
    fatPer100g: 42.2,
    calories: 534,
  },
  {
    name: "Eggs",
    carbsPer100g: 1.4,
    proteinPer100g: 12.2,
    fatPer100g: 9.9,
    calories: 142,
  },
];

function getMealMacros(foodNamesWithQuantities, foodInformation) {
  return foodNamesWithQuantities.reduce(
    (acc, curr) => {
      const portionMultiplier = curr.portionInGramms / 100;
      const foodMacros = foodInformation.find(
        (foodInfo) => foodInfo.name === curr.name
      );

      return {
        proteinInGramms: addToAccWithMultiplier(
          "proteinInGramms",
          "proteinPer100g"
        ),
        carbsInGramms: addToAccWithMultiplier("carbsInGramms", "carbsPer100g"),
        fatInGramms: addToAccWithMultiplier("fatInGramms", "fatPer100g"),
        calories: addToAccWithMultiplier("calories", "calories"),
      };

      function addToAccWithMultiplier(accField, currField) {
        return acc[accField] + foodMacros[currField] * portionMultiplier;
      }
    },
    {
      proteinInGramms: 0,
      carbsInGramms: 0,
      fatInGramms: 0,
      calories: 0,
    }
  );
}

module.exports.foodInformations = foodInformations;
