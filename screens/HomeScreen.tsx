import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { MenuItem } from "../App";

interface Props {
  menuItems: MenuItem[];
  averages: Record<string, number>;
  onAddPress: () => void;
  onFilterPress: () => void;
  onDeleteItem: (id: string) => void;
}

const HomeScreen: React.FC<Props> = ({ menuItems, averages, onAddPress, onFilterPress, onDeleteItem }) => {
  const confirmDelete = (id: string, name: string) => {
    Alert.alert("Delete Dish", `Remove "${name}" from menu?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDeleteItem(id) },
    ]);
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.tag}>{item.course}</Text>
      </View>
      <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => confirmDelete(item.id, item.name)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ChefCast Menu</Text>

      <View style={styles.stats}>
        <Text>Breakfast: R{averages.Breakfast ?? 0}</Text>
        <Text>Lunch: R{averages.Lunch ?? 0}</Text>
        <Text>Dinner: R{averages.Dinner ?? 0}</Text>
        <Text>Dessert: R{averages.Dessert ?? 0}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onAddPress}>
        <Text style={styles.buttonText}>Add New Dish</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={onFilterPress}>
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>

      <FlatList data={menuItems} keyExtractor={i => i.id} renderItem={renderItem} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#f5f5f5" },
  header: { textAlign: "center", fontSize: 26, marginTop: 40, marginBottom: 20 },
  stats: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginHorizontal: 16, marginBottom: 16 },
  button: { backgroundColor: "#FF6B35", marginHorizontal: 16, padding: 14, borderRadius: 8, marginBottom: 10, alignItems: "center" },
  buttonSecondary: { backgroundColor: "#333", marginHorizontal: 16, padding: 14, borderRadius: 8, marginBottom: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 16, borderRadius: 8, padding: 12 },
  image: { width: "100%", height: 140, borderRadius: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  name: { fontSize: 16, fontWeight: "bold" },
  tag: { fontSize: 12, backgroundColor: "#FFE5D9", paddingHorizontal: 6, borderRadius: 4 },
  price: { marginTop: 6, fontWeight: "bold" },
  delete: { color: "#ff4444", marginTop: 6 },
});

export default HomeScreen;
