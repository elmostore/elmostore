export async function handler() {
  //1
  const res = await fetch("https://api.printful.com/countries", {
    headers: {Authorization: "Bearer " + process.env.PRINTFUL_TOKEN}
                                                                }    );
  //2
 const data = await res.json();
  //3
  return { statusCode: 200,
                 body: JSON.stringify(data.result)
        };
                                 }
//========================================================================================
/*export default async (req, res) => {
  try {
    const response = await fetch("https://api.printful.com/countries");
    const data = await response.json();

    res.status(200).json(data.result);
  } catch (error) {
    res.status(500).json({ error: "Failed to load countries" });
  }
};*/
