const foodInformations = [
  {
    id: '4bed9792-4e6b-48f5-846c-819e96881d98',
    name: "Oats",
    carbsPer100g: 68,
    proteinPer100g: 13,
    fatPer100g: 7,
    calories: 389,
  },
  {
    id: '0be2c200-6ca0-4645-9255-fa41d548b15a',
    name: "Protein Powder",
    carbsPer100g: 5,
    proteinPer100g: 80,
    fatPer100g: 5,
    calories: 400,
  },
  {
    id: '52a42a50-57e3-4a76-9421-9f149d2f5d1a',
    name: "Chocolate (dark, 70-85% cocoa)",
    carbsPer100g: 46,
    proteinPer100g: 8,
    fatPer100g: 43,
    calories: 600,
  },
  {
    id: 'b114db6f-5c04-407e-879d-5c2dae311cce',
    name: "Banana",
    carbsPer100g: 23,
    proteinPer100g: 1.1,
    fatPer100g: 0.3,
    calories: 96,
  },
  {
    id: '46a01ece-5287-4c4c-8c06-fe72a8c07c88',
    name: "Chicken Breast (cooked, skinless)",
    carbsPer100g: 0,
    proteinPer100g: 31,
    fatPer100g: 4,
    calories: 165,
  },
  {
    id: '86ec8960-1982-43ae-9f4f-ec2dda108786',
    name: "Pork Ribs (cooked)",
    carbsPer100g: 0,
    proteinPer100g: 26,
    fatPer100g: 29,
    calories: 361,
  },
  {
    id: 'b7af9f0c-b4ed-4b43-b539-a47b8735e3dd',
    name: "Rice (white, cooked)",
    carbsPer100g: 79,
    proteinPer100g: 7.1,
    fatPer100g: 0.6,
    calories: 365,
  },
  {
    id: 'efafb06e-23bc-4884-9aec-7b0b8011c64e',
    name: "Olive Oil",
    carbsPer100g: 0,
    proteinPer100g: 0,
    fatPer100g: 100,
    calories: 884,
  },
  {
    id: 'fade03dc-3fdd-4a2f-b1f8-8d696a7b8a9d',
    name: "Peanut Butter",
    carbsPer100g: 20,
    proteinPer100g: 25,
    fatPer100g: 50,
    calories: 588,
  },
  {
    id: '33c5230d-3339-4843-b3be-c0d1521d137e',
    name: "Cream Rice",
    carbsPer100g: 79,
    proteinPer100g: 6.6,
    fatPer100g: 0.6,
    calories: 348,
  },
  {
    id: 'fc501ef0-bf3c-4029-aac9-0019d41af13c',
    name: "Cashews (raw)",
    carbsPer100g: 30,
    proteinPer100g: 18,
    fatPer100g: 44,
    calories: 553,
  },
  {
    id: '580d7cb9-491e-4a77-9d78-3487df0a9ccc',
    name: "Skyr (plain)",
    carbsPer100g: 4,
    proteinPer100g: 11,
    fatPer100g: 0.2,
    calories: 64,
  },
  {
    id: '2f75365c-495e-4efb-af9f-d82d8fad0fec',
    name: "Bulgarian yogurt",
    carbsPer100g: 4.2,
    proteinPer100g: 3.7,
    fatPer100g: 4.5,
    calories: 72,
  },
  {
    id: '86ff8555-b64a-4ee4-8512-9f83e4a49468',
    name: "Almonds (raw)",
    carbsPer100g: 22,
    proteinPer100g: 21,
    fatPer100g: 50,
    calories: 579,
  },
  {
    id: '16785ced-33a4-4ae0-b90f-a4b0e096dd21',
    name: "File Elena",
    carbsPer100g: 1,
    proteinPer100g: 40,
    fatPer100g: 2,
    calories: 193,
  },
  {
    id: '1f291e7e-ecf9-4ac1-832f-f51ae9b9abfc',
    name: "Cottage Cheese",
    carbsPer100g: 3,
    proteinPer100g: 12.5,
    fatPer100g: 4.5,
    calories: 103,
  },
  {
    id: '272e98c3-3462-4698-be48-99080e6a2e59',
    name: "Bread",
    carbsPer100g: 39,
    proteinPer100g: 9,
    fatPer100g: 1.4,
    calories: 222,
  },
  {
    id: '53c44d41-b791-48e2-bac2-e0c0f827cd1e',
    name: "Flax Seed",
    carbsPer100g: 29,
    proteinPer100g: 18.3,
    fatPer100g: 42.2,
    calories: 534,
  },
  {
    id: '093425ee-3b94-4bff-890e-2cd04e05d0f3',
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
