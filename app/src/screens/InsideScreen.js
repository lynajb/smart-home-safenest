import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Button, RefreshControl, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEventsData } from '../hooks/useEventsData';

const InsideScreen = () => {
  const { events, isLoading, getAllEvents } = useEventsData(); // Updated to include getAllEvents
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date'); // Default sort by date
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllEvents().finally(() => setRefreshing(false)); // Refetch the events
  };

  const filteredEvents = events.filter(event => 
    event.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedEvents = filteredEvents.sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOption === 'type') {
      return a.eventType.localeCompare(b.eventType);
    }
    return 0;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => setSelectedEvent(item)}>
      <View style={styles.cardContent}>
        <Icon name="calendar-clock" size={24} color="#6d28d9" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.eventType}</Text>
          <Text style={styles.cardText}>{new Date(item.timestamp).toLocaleDateString()}</Text>
          <Text style={styles.cardText}>{item.payload.humidity}% Humidity</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#f8f9fa', '#ffffff']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <View style={styles.sortContainer}>
            <Button title="Sort by Date" onPress={() => handleSort('date')} />
            <Button title="Sort by Type" onPress={() => handleSort('type')} />
          </View>
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6d28d9" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={sortedEvents}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.listContainer}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
            {selectedEvent && (
              <Modal
                transparent={true}
                visible={!!selectedEvent}
                onRequestClose={() => setSelectedEvent(null)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{selectedEvent.eventType}</Text>
                    <Text style={styles.modalText}>Timestamp: {new Date(selectedEvent.timestamp).toLocaleString()}</Text>
                    <Text style={styles.modalText}>Sensor ID: {selectedEvent.payload.sensorId}</Text>
                    <Text style={styles.modalText}>Humidity: {selectedEvent.payload.humidity}%</Text>
                    <Button title="Close" onPress={() => setSelectedEvent(null)} />
                  </View>
                </View>
              </Modal>
            )}
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 22,
    color: '#6d28d9',
    marginTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#6d28d9',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#343a40',
  },
  cardText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#343a40',
  },
  modalText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
  },
});

export default InsideScreen;
