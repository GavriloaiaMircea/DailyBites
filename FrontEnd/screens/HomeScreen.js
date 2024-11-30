import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserStore from "../stores/useUserStore";
import { useSearch } from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser, clearUser } = useUserStore();
  const userName = currentUser?.name || "Guest";
  const { results, search, error, loading } = useSearch();

  const handleSearch = () => {
    search(searchQuery);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          AsyncStorage.removeItem("token")
            .then(() => {
              clearUser();
              navigation.replace("Login");
            })
            .catch((error) => {
              console.error("Error during logout:", error);
            });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        <ResultsList results={results} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#4CAF50",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  logoutButton: {
    padding: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  loadingText: {
    color: "#888",
    marginTop: 10,
  },
});
