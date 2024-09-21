import React, { useEffect, useState } from 'react';
import { View,FlatList, Text,TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import ArticleCard from '../../components/article';
import Navigator from "../../routes/homestack";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = '8c107533752d4233bbc6e6c33080b2d0';  // Replace with your actual NewsAPI key
  const API_URL = `https://newsapi.org/v2/everything?q=latest&apiKey=${API_KEY}`;

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(API_URL)
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => {
        console.log(data);  // Log the full JSON response to the console
        setArticles(data.articles);  // Extract the articles and set state
        setFilteredArticles(data.articles)
        setLoading(false);  // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);  // Log any errors
      });
  }, []);

  // Filter articles based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  // Simple UI to show articles or loading spinner
  return (
    <View style = {styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredArticles}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default Home;