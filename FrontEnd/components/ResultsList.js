import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

export default function ResultsList({ results }) {
  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={styles.resultList}
    />
  );
}

const styles = StyleSheet.create({
  resultList: {
    marginTop: 20,
    width: "100%",
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
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
});
