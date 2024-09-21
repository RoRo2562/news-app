import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View,FlatList, Text,TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import ArticleCard from './components/article';
import Navigator from "./routes/homestack";



const App = () => {
  return (
    <Navigator />
  )

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

export default App;
