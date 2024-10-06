const test = require("node:test");
const assert = require("node:assert");
const index = require("./meal-information");
const { v4: uuidv4} = require("uuid")

test("it should return the correct macros for 1 type of food for 100g", () => {
  const oatsId = uuidv4();
  const macros = index.getMealMacros(
    [{ id: oatsId, portionInGramms: 100 }],
    [
      {
        id: oatsId,
        name: "Oats",
        carbsPer100g: 68,
        proteinPer100g: 13,
        fatPer100g: 7,
        calories: 389,
      },
    ]
  );

  assert.deepEqual(macros, {
    proteinInGramms: 13,
    carbsInGramms: 68,
    fatInGramms: 7,
    calories: 389,
  });
});

test("it should return the correct macros for 1 type of food for 200g", () => {
  const oatsId = uuidv4();
  const macros = index.getMealMacros(
    [{ id: oatsId, portionInGramms: 200 }],
    [
      {
        id: oatsId,
        name: "Oats",
        carbsPer100g: 68,
        proteinPer100g: 13,
        fatPer100g: 7,
        calories: 389,
      },
    ]
  );

  assert.deepEqual(macros, {
    proteinInGramms: 26,
    carbsInGramms: 136,
    fatInGramms: 14,
    calories: 778,
  });
});

test("it should return the correct macros for 2 types of food for 100g", () => {
  const oatsId = uuidv4();
  const proteinPowderId = uuidv4();
  const macros = index.getMealMacros(
    [
      { id: oatsId, portionInGramms: 100 },
      { id: proteinPowderId, portionInGramms: 100 },
    ],
    [
      {
        id: oatsId,
        name: "Oats",
        carbsPer100g: 68,
        proteinPer100g: 13,
        fatPer100g: 7,
        calories: 389,
      },
      {
        id: proteinPowderId,
        name: "Protein Powder",
        carbsPer100g: 5,
        proteinPer100g: 80,
        fatPer100g: 5,
        calories: 400,
      },
    ]
  );

  assert.deepEqual(macros, {
    proteinInGramms: 93,
    carbsInGramms: 73,
    fatInGramms: 12,
    calories: 789,
  });
});
