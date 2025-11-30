export default async (req, res) => {
  const token = process.env.PRINTFUL_TOKEN;
  const country = req.query.country;

  const response = await fetch(`https://api.printful.com/v2/countries/${country}/states`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const json = await response.json();
  res.status(200).json(json.result.states || []);
};
