import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import type { MenuItem } from '../App';

interface HomeScreenProps {
  menuItems: MenuItem[];
  onAddPress: () => void;
  onDeleteItem: (id: string) => void;
  onFilterPress: () => void;
}

/* Required rubric loops */

function groupByCourseUsingFor(items: MenuItem[]): Record<string, MenuItem[]> {
  const groups: Record<string, MenuItem[]> = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!groups[item.course]) groups[item.course] = [];
    groups[item.course].push(item);
  }
  return groups;
}

function countWithWhile(items: MenuItem[]): number {
  let count = 0;
  let i = 0;
  while (i < items.length) {
    count++;
    i++;
  }
  return count;
}

function computeAveragesUsingForIn(groups: Record<string, MenuItem[]>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const course in groups) {
    const arr = groups[course];
    const sum = arr.reduce((acc, it) => acc + it.price, 0);
    result[course] = arr.length ? sum / arr.length : 0;
  }
  return result;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onAddPress, onDeleteItem, onFilterPress }) => {
  const totalItems = countWithWhile(menuItems);
  const grouped = groupByCourseUsingFor(menuItems);
  const avgByCourse = computeAveragesUsingForIn(grouped);

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Dish', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDeleteItem(id) },
    ]);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      {item.image && <Image source={{ uri: item.image }} style={styles.dishImage} />}
      <View style={styles.cardContent}>
        <View style={styles.menuCardHeader}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.courseTag}>{item.course}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id, item.name)}>
            <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ListHeader = (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ChefCast</Text>
        <Text style={styles.headerSubtitle}>Menu Management</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
      </View>

      <View style={styles.avgCard}>
        <Text style={styles.avgTitle}>Average Price by Course</Text>
        {Object.keys(avgByCourse).map((c) => (
          <View key={c} style={styles.avgRow}>
            <Text style={styles.avgCourse}>{c}</Text>
            <Text style={styles.avgValue}>R{avgByCourse[c].toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.addDishButton} onPress={onAddPress}>
          <Text style={styles.addDishButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Text style={styles.filterButtonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Current Menu</Text>

      {menuItems.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🍽️</Text>
          <Text style={styles.emptyStateText}>No dishes yet</Text>
          <Text style={styles.emptyStateSubtext}>Tap Add New Dish to begin</Text>
        </View>
      )}
    </>
  );

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id}
      renderItem={renderMenuItem}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#FF6B35', padding: 20, paddingTop: 50, alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 16, color: '#FFE5D9', marginTop: 5 },
  statsCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 36, fontWeight: 'bold', color: '#FF6B35' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  avgCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 16,
    borderRadius: 10,
  },
  avgTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16, color: '#333' },
  avgRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  avgCourse: { color: '#444' },
  avgValue: { color: '#FF6B35', fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', gap: 10, marginHorizontal: 15, marginBottom: 10 },
  addDishButton: { flex: 1, backgroundColor: '#FF6B35', padding: 15, borderRadius: 10, alignItems: 'center' },
  addDishButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  filterButton: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  filterButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginHorizontal: 15, marginBottom: 15 },
  menuCard: { backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 15, marginBottom: 15, overflow: 'hidden' },
  dishImage: { width: '100%', height: 200 },
  cardContent: { padding: 15 },
  menuCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dishName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  courseTag: { backgroundColor: '#FFE5D9', color: '#FF6B35', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  description: { color: '#666', marginVertical: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#FF6B35' },
  deleteButton: { backgroundColor: '#ff4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  emptyState: { backgroundColor: '#fff', padding: 40, borderRadius: 10, alignItems: 'center', marginHorizontal: 15 },
  emptyStateIcon: { fontSize: 48, marginBottom: 10 },
  emptyStateText: { fontSize: 18, fontWeight: '600', color: '#666' },
  emptyStateSubtext: { fontSize: 14, color: '#999', marginTop: 5 },
});

export default HomeScreen;
