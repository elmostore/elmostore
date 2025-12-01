export default async (req, res) => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    res.status(200).json(data.result);
  } catch (error) {
    res.status(500).json({ error: "Failed to load countries" });
  }
};
