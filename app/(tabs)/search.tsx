import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';

const TRENDING_TOPICS = [
  { id: '1', tag: 'technology', posts: 1234 },
  { id: '2', tag: 'photography', posts: 987 },
  { id: '3', tag: 'travel', posts: 856 },
  { id: '4', tag: 'food', posts: 743 },
  { id: '5', tag: 'art', posts: 652 },
];

export default function SearchScreen() {
  const renderTrendingTopic = ({ item }) => (
    <TouchableOpacity style={styles.topicContainer}>
      <Text style={styles.topicTag}>#{item.tag}</Text>
      <Text style={styles.topicPosts}>{item.posts} posts</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts, people, or tags"
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>Trending Topics</Text>

      <FlatList
        data={TRENDING_TOPICS}
        renderItem={renderTrendingTopic}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  topicContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  topicTag: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  topicPosts: {
    fontSize: 14,
    color: '#666',
  },
});