export default async (req, res) => {
  const token = process.env.PRINTFUL_TOKEN;
  //https://api.printful.com/countries /v2/

  const response = await fetch("https://api.printful.com/countries", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const json = await response.json();
  res.status(200).json(json.result.countries);
};
