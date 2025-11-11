import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { MenuItem } from '../App';
import { COURSES } from './AddDishScreen';

interface FilterScreenProps {
  items: MenuItem[];
  onBack: () => void;
  onDeleteItem: (id: string) => void;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ items, onBack, onDeleteItem }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const courseOptions = useMemo(() => ['All', ...COURSES], []);

  const filteredItems = useMemo(() => {
    if (selectedCourse === 'All') return items;
    return items.filter(item => item.course === selectedCourse);
  }, [items, selectedCourse]);

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Dish', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDeleteItem(id) },
    ]);
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.tag}>{item.course}</Text>
        </View>
        <Text style={styles.desc}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id, item.name)}>
            <Text style={styles.deleteTxt}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backTxt}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter Menu</Text>
        <Text style={styles.subtitle}>Select a course to display only relevant dishes</Text>
      </View>

      {/* Picker */}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(value) => setSelectedCourse(String(value))}
          style={styles.picker}
          dropdownIconColor="#FF6B35"
        >
          {courseOptions.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>
      </View>

      {/* Filtered List */}
      <View style={styles.listContainer}>
        {filteredItems.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyText}>No dishes found for this course</Text>
          </View>
        ) : (
          <FlatList data={filteredItems} keyExtractor={(i) => i.id} renderItem={renderItem} />
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: { marginBottom: 6 },
  backTxt: { color: '#fff', fontSize: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#FFE5D9', marginTop: 4 },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    margin: 16,
    height: 55,
    justifyContent: 'center',
  },
  picker: { height: 55, color: '#333' },

  listContainer: { flex: 1, paddingHorizontal: 16 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: { width: '100%', height: 180 },
  cardBody: { padding: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  tag: { backgroundColor: '#FFE5D9', color: '#FF6B35', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },

  desc: { color: '#666', marginTop: 6, marginBottom: 8 },
  price: { color: '#FF6B35', fontSize: 16, fontWeight: 'bold' },

  deleteBtn: { backgroundColor: '#ff4444', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  deleteTxt: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

  empty: { alignItems: 'center', marginTop: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 10 },
  emptyText: { color: '#777', fontSize: 16 },
});

export default FilterScreen;
