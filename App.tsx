import React, { useEffect, useState } from 'react';
import { View,FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import ArticleCard from './components/article';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'c107533752d4233bbc6e6c33080b2d0';  // Replace with your actual NewsAPI key
  const API_URL = `https://newsapi.org/v2/everything?q=latest&apiKey=8c107533752d4233bbc6e6c33080b2d0`;

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(API_URL)
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => {
        console.log(data);  // Log the full JSON response to the console
        setArticles(data.articles);  // Extract the articles and set state
        setLoading(false);  // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);  // Log any errors
      });
  }, []);

  // Simple UI to show articles or loading spinner
  return (
    <View style = {styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={articles}
          renderItem={({ item }) => <ArticleCard item={item} />}  // Use your ArticleCard component
          keyExtractor={(item, index) => item.url + index}  // Ensure unique keys (use the article URL as a key)
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default App;
