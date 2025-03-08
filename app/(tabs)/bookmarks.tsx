import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Bookmark as BookmarkIcon } from 'lucide-react-native';

const BOOKMARKED_POSTS = [
  {
    id: '1',
    user: {
      name: 'David Lee',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    content: 'The best coffee spots in the city! ☕️ #coffee #citylife',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    savedAt: '2h ago',
  },
  {
    id: '2',
    user: {
      name: 'Alice Wang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    },
    content: 'My favorite art gallery exhibition 🎨 #art #culture',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5',
    savedAt: '1d ago',
  },
];

export default function BookmarksScreen() {
  const renderBookmark = ({ item }) => (
    <TouchableOpacity style={styles.bookmarkContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.savedTime}>Saved {item.savedAt}</Text>
        </View>
        <BookmarkIcon size={20} color="#007AFF" />
      </View>
      
      <Text style={styles.content}>{item.content}</Text>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <FlatList
        data={BOOKMARKED_POSTS}
        renderItem={renderBookmark}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  bookmarkContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  savedTime: {
    fontSize: 13,
    color: '#999',
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});