const API_KEY = '8c107533752d4233bbc6e6c33080b2d0';  // Replace with your actual NewsAPI key
const BASE_API_URL = `https://newsapi.org/v2/everything?q=latest&apiKey=${API_KEY}`;

export const fetchArticles = async (page = 1, pageSize = 20) => {
  try {
    const response = await fetch(`${BASE_API_URL}&pageSize=${pageSize}&page=${page}`);
    const data = await response.json();
    return data.articles;  // Return the articles array
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};