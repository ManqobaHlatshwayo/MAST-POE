import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { MenuItem } from '../App';

interface HomeScreenProps {
  menuItems: MenuItem[];
  totalItems: number;
  averagePrices: { [course: string]: number };
  onAddPress: () => void;
  onDeleteItem: (id: string) => void;
  onFilterPress: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  menuItems,
  totalItems,
  averagePrices,
  onAddPress,
  onDeleteItem,
  onFilterPress,
}) => {
  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Dish',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDeleteItem(id) },
      ]
    );
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      {item.image && <Image source={{ uri: item.image }} style={styles.dishImage} />}
      <View style={styles.cardContent}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id, item.name)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>ChefCast</Text>
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statText}>Total Items: {totalItems}</Text>
          <Text style={styles.statLabel}>Average Prices by Course:</Text>
          {Object.entries(averagePrices).map(([course, avg]) => (
            <Text key={course} style={styles.averageText}>
              {course}: R{avg.toFixed(2)}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.addDishButton} onPress={onAddPress}>
          <Text style={styles.addDishButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>

        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },
  header: {
    backgroundColor: '#FF6B35',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  filterButton: { backgroundColor: '#fff', paddingHorizontal: 12, borderRadius: 6 },
  filterButtonText: { color: '#FF6B35', fontWeight: 'bold' },
  statsCard: { backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 10 },
  statText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  statLabel: { fontSize: 14, marginBottom: 5, color: '#666' },
  averageText: { fontSize: 14, color: '#333' },
  addDishButton: { backgroundColor: '#FF6B35', margin: 15, padding: 15, borderRadius: 10, alignItems: 'center' },
  addDishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  menuCard: { backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 15, borderRadius: 10, overflow: 'hidden' },
  dishImage: { width: '100%', height: 160 },
  cardContent: { padding: 15 },
  dishName: { fontSize: 18, fontWeight: 'bold' },
  description: { color: '#666', marginVertical: 5 },
  price: { color: '#FF6B35', fontWeight: 'bold', marginBottom: 10 },
  deleteButton: { backgroundColor: '#ff4444', padding: 6, borderRadius: 6 },
  deleteButtonText: { color: '#fff' },
});

export default HomeScreen;
