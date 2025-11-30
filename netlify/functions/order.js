export default async (req, res) => {
  const token = process.env.PRINTFUL_TOKEN;
  const body = JSON.parse(req.body);

  const response = await fetch("https://api.printful.com/v2/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      recipient: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        city: body.city,
        state_code: body.state_code,
        country_code: body.country_code,
        zip: body.zip,
        tax_number: body.tax_number
      },
      items: [
        {
          variant_id: 4011,
          quantity: 1
        }
      ]
    })
  });

  const json = await response.json();
  res.status(200).json(json.result);
};
