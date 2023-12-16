import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

const Logs = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'Dezin', role: 'Admin' },
    { id: '2', name: 'Jane Smith', role: 'User' },
    // Add more user objects as needed
  ]);

  const [entranceLogs, setEntranceLogs] = useState([]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');





  const logEntrance = (userId, userName) => {
    const log = {
      userId,
      userName,
      timestamp: new Date().toLocaleString(),
    };
    setEntranceLogs([log, ...entranceLogs]);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItemContainer}>
      <View style={styles.userItem}>
        <Text>{item.name}</Text>
        <Button
          title="Log Entrance"
          onPress={() => logEntrance(item.id, item.name)}
        />
      </View>
    </View>
  );

  const renderLogItem = ({ item }) => (
    <View style={styles.logItemContainer}>
      <Text>{`${item.userName} entered at ${item.timestamp}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Logs</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        style={styles.userList}
      />
      <Text style={styles.logTitle}>Entrance Logs</Text>
      <FlatList
        data={entranceLogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLogItem}
        style={styles.logList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  userItemContainer: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userList: {
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  logItemContainer: {
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  logList: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
});

export default Logs;