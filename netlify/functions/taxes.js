export default async (req, res) => {
  const token = process.env.PRINTFUL_TOKEN;
  const body = JSON.parse(req.body);

  const response = await fetch("https://api.printful.com/v2/tax/rates", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      recipient: {
        country_code: body.country_code,
        state_code: body.state_code,
        city: body.city,
        zip: body.zip,
        tax_number: body.tax_number
      }
    })
  });

  const json = await response.json();
  res.status(200).json(json.result || {});
};
