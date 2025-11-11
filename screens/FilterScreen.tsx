import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuItem } from "../App";

interface Props {
  items: MenuItem[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

const FilterScreen: React.FC<Props> = ({ items, onBack, onDelete }) => {
  const courses = Array.from(new Set(items.map(i => i.course)));
  const [course, setCourse] = useState(courses[0] ?? "");

  const filtered = items.filter(i => i.course === course);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu</Text>
      <Picker selectedValue={course} onValueChange={setCourse} style={styles.picker}>
        {courses.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - R{item.price}</Text>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, marginBottom: 14, textAlign: "center" },
  picker: { backgroundColor: "#eee", marginBottom: 20 },
  item: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  delete: { color: "#ff4444" },
  back: { backgroundColor: "#FF6B35", padding: 14, borderRadius: 8, marginTop: 14 },
  backText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
});

export default FilterScreen;
