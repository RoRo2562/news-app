import React, { useEffect, useState } from 'react';
import { View,FlatList, Text,TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import ArticleCard from '../../components/article';
import { fetchArticles } from '../../apis/newsApi';


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);  // State to track if more articles are available

  const pageSize = 20;  // Number of articles per page

  useEffect(() => {
    loadArticles(currentPage);  // Load initial articles when the component mounts
  }, []);

  const loadArticles = async (page: number) => {
    setLoading(true);  // Show loading spinner during data fetching
    try {
      const fetchedArticles = await fetchArticles(page, pageSize);
      if (fetchedArticles.length < pageSize) {
        setHasMore(false);  // No more articles to load
      }
      setArticles(prevArticles => [...prevArticles, ...fetchedArticles]);  // Append new articles
      setFilteredArticles(prevArticles => [...prevArticles, ...fetchedArticles]);  // Update filtered list
      setLoading(false);  // Stop loading spinner
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);  // Stop loading spinner on error
    }
  };

  const loadMoreArticles = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);  // Show loading more spinner
      const nextPage = currentPage + 1;
      loadArticles(nextPage);
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }
  };

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading && currentPage === 1 ? (  // Show loading spinner only during the first load
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredArticles}
          renderItem={({ item }) => <ArticleCard item={item} />}
          keyExtractor={(item, index) => item.url + index}
          onEndReached={loadMoreArticles}  // Load more when end of list is reached
          onEndReachedThreshold={0.5}  // Trigger when 50% of the list is scrolled
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
          }  // Show footer loading indicator when loading more articles
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