import React from 'react';
import { TouchableOpacity, Image, View, Text, Linking, StyleSheet } from 'react-native';

interface ArticleCardProps {
  item: {
    url: string;
    urlToImage: string;
    title: string;
    description: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => {
  const placeholderImage = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
  return (
    <TouchableOpacity style={styles.articleContainer} onPress={() => Linking.openURL(item.url)}>
      <Image source={{ uri: item.urlToImage || placeholderImage }} style={styles.articleImage} />
      <View style={styles.articleDetails}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2, // For shadow in Android
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleDetails: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ArticleCard;