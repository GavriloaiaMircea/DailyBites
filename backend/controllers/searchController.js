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
      if (!data) {
        return res
          .status(404)
          .json({ message: "No data found for this product" });
      }

      const getNutrientValue = (nutrients, nutrientName) => {
        const nutrient = nutrients.find((item) => {
          return (
            item.nutrient &&
            item.nutrient.name &&
            item.nutrient.name.toLowerCase() === nutrientName.toLowerCase()
          );
        });
        return nutrient ? nutrient.amount : 0;
      };

      const labelNutrients = data.labelNutrients || {};
      const foodNutrients = data.foodNutrients || [];

      const nutritionalInfo = {
        name: data.description,
        servingSize: `${data.servingSize || "N/A"} ${
          data.servingSizeUnit || ""
        }`.trim(),
        calories:
          labelNutrients.calories?.value ||
          getNutrientValue(foodNutrients, "Energy"),
        macronutrients: {
          carbohydrates:
            labelNutrients.carbohydrates?.value ||
            getNutrientValue(foodNutrients, "Carbohydrate, by difference"),
          protein:
            labelNutrients.protein?.value ||
            getNutrientValue(foodNutrients, "Protein"),
          fat:
            labelNutrients.fat?.value ||
            getNutrientValue(foodNutrients, "Total lipid (fat)"),
          fiber:
            labelNutrients.fiber?.value ||
            getNutrientValue(foodNutrients, "Fiber, total dietary"),
          sugars:
            labelNutrients.sugars?.value ||
            getNutrientValue(foodNutrients, "Total Sugars"),
        },
        micronutrients: {
          calcium:
            labelNutrients.calcium?.value ||
            getNutrientValue(foodNutrients, "Calcium, Ca"),
          iron:
            labelNutrients.iron?.value ||
            getNutrientValue(foodNutrients, "Iron, Fe"),
          potassium:
            labelNutrients.potassium?.value ||
            getNutrientValue(foodNutrients, "Potassium, K"),
        },
        otherNutrients: {
          saturatedFat:
            labelNutrients.saturatedFat?.value ||
            getNutrientValue(foodNutrients, "Fatty acids, total saturated"),
          cholesterol:
            labelNutrients.cholesterol?.value ||
            getNutrientValue(foodNutrients, "Cholesterol"),
          sodium:
            labelNutrients.sodium?.value ||
            getNutrientValue(foodNutrients, "Sodium, Na"),
        },
      };

      res.json(nutritionalInfo);
    })
    .catch((error) => {
      console.error("Error fetching data from USDA API:", error);
      res.status(500).json({ error: "Failed to fetch product details" });
    });
};
