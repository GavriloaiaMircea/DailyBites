import React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ResultsList({ results, onSelect }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onSelect(item.id)}
    >
      <Text style={styles.resultText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={styles.resultList}
      contentContainerStyle={styles.resultListContent}
    />
  );
}

const styles = StyleSheet.create({
  resultList: {
    width: "100%",
  },
  resultListContent: {
    paddingHorizontal: 20,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: width > 400 ? 400 : "100%",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
});
