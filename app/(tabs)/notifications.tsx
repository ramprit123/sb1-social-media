import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    content: 'liked your post',
    time: '2m ago',
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    content: 'commented on your post',
    time: '15m ago',
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Sophie Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    },
    content: 'started following you',
    time: '1h ago',
  },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationContainer}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          <Text style={styles.userName}>{item.user.name}</Text> {item.content}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={NOTIFICATIONS}
        renderItem={renderNotification}
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
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  time: {
    fontSize: 13,
    color: '#999',
  },
});