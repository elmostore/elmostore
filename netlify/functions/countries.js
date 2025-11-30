export default async (req, res) => {
  const token = process.env.PRINTFUL_TOKEN;

  const response = await fetch("https://api.printful.com/v2/countries", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const json = await response.json();
  res.status(200).json(json.result.countries);
};
