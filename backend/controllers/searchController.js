export const searchFood = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const apiKey = process.env.USDA_API_KEY;
  const apiUrl = `${process.env.USDA_API_URL}/search?query=${encodeURIComponent(
    query
  )}&api_key=${apiKey}`;

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
