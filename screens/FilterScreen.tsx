import React, { useMemo, useState } from 'react';
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

  const choices = useMemo(() => ['All', ...COURSES], []);

  const data = useMemo(() => {
    if (selectedCourse === 'All') return items;
    return items.filter(i => i.course === selectedCourse);
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backTxt}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter by Course</Text>
        <Text style={styles.subtitle}>Show only items from a specific course</Text>
      </View>

      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={v => setSelectedCourse(String(v))}
          style={styles.picker}
          dropdownIconColor="#FF6B35"
        >
          {choices.map(c => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <View style={styles.listWrap}>
        {data.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyText}>No items match this filter.</Text>
          </View>
        ) : (
          <FlatList data={data} renderItem={renderItem} keyExtractor={i => i.id} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#FF6B35', paddingTop: 50, paddingBottom: 16, paddingHorizontal: 16 },
  backBtn: { marginBottom: 8 },
  backTxt: { color: '#fff', fontSize: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#FFE5D9', marginTop: 4 },
  pickerWrap: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: { height: 54 },
  listWrap: { flex: 1, paddingHorizontal: 16, paddingBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  image: { width: '100%', height: 180 },
  cardBody: { padding: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8 },
  tag: { backgroundColor: '#FFE5D9', color: '#FF6B35', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  desc: { color: '#666', marginTop: 6, marginBottom: 8, lineHeight: 20 },
  price: { color: '#FF6B35', fontSize: 16, fontWeight: 'bold' },
  deleteBtn: { backgroundColor: '#ff4444', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  deleteTxt: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  empty: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyIcon: { fontSize: 40, marginBottom: 6 },
  emptyText: { color: '#666' },
});

export default FilterScreen;
