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

module.exports.getMealMacros = getMealMacros;
