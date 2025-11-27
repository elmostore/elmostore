// This file runs on Netlify server — token is safe
export async function handler(event, context) {
const token = process.env.MY_SECRET_TOKEN; // Loaded safely from Netlify


// Fake example request using the token
const response = {
success: true,
message: "Token used securely on server",
token_starts_with: token ? token.slice(0, 5) : "NO_TOKEN"
};


return {
statusCode: 200,
body: JSON.stringify(response)
};
}
