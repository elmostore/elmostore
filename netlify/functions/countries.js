export default async (req, res) => {
  try {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const json = await result.json();

    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: "Failed to load countries" });
  }
};
