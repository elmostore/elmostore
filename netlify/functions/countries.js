export default async (req, res) => {
  try {
    const result = await fetch("https://api.printful.com/countries");
    const json = await result.json();

    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: "Failed to load countries" });
  }
};
