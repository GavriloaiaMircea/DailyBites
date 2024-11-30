import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for food..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: width > 400 ? 400 : "90%",
    paddingLeft: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    padding: 13,
    marginLeft: 10,
  },
});
