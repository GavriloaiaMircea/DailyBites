const apiKey = process.env.USDA_API_KEY;

export const searchFood = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const apiUrl = `${
    process.env.USDA_API_URL
  }/foods/search?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data.foods || data.foods.length === 0) {
        return res.status(404).json({ message: "No results found" });
      }

      const processedData = data.foods.map((food) => ({
        id: food.fdcId,
        name: food.description,
      }));

      res.json(processedData);
    })
    .catch((error) => {
      console.error("Error fetching data from USDA API:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
};

export const getFoodDetails = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Food ID is required" });
  }

  const apiUrl = `${process.env.USDA_API_URL}/food/${encodeURIComponent(
    id
  )}?api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data.labelNutrients) {
        return res
          .status(404)
          .json({ message: "No nutritional details found" });
      }

      const nutritionalInfo = {
        name: data.description,
        servingSize: `${data.servingSize} ${data.servingSizeUnit}`,
        calories: data.labelNutrients.calories?.value || 0,
        macronutrients: {
          carbohydrates: data.labelNutrients.carbohydrates?.value || 0,
          protein: data.labelNutrients.protein?.value || 0,
          fat: data.labelNutrients.fat?.value || 0,
          fiber: data.labelNutrients.fiber?.value || 0,
          sugars: data.labelNutrients.sugars?.value || 0,
        },
        micronutrients: {
          calcium: data.labelNutrients.calcium?.value || 0,
          iron: data.labelNutrients.iron?.value || 0,
          potassium: data.labelNutrients.potassium?.value || 0,
        },
        otherNutrients: {
          saturatedFat: data.labelNutrients.saturatedFat?.value || 0,
          cholesterol: data.labelNutrients.cholesterol?.value || 0,
          sodium: data.labelNutrients.sodium?.value || 0,
        },
      };

      res.json(nutritionalInfo);
    })
    .catch((error) => {
      console.error("Error fetching data from USDA API:", error);
      res.status(500).json({ error: "Failed to fetch product details" });
    });
};
