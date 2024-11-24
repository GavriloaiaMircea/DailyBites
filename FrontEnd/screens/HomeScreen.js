import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../stores/useUserStore";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useUserStore();
  const userName = currentUser.name || "Guest";

  const handleSearch = () => {
    console.log("Căutare pentru:", searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or something good..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 30,
    textAlign: "center",
  },
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
