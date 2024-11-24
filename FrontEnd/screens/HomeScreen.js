import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import useUserStore from "../stores/useUserStore";
import { useSearch } from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useUserStore();
  const userName = currentUser.name || "Guest";
  const { results, search, error, loading } = useSearch();

  const handleSearch = () => {
    search(searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
  loadingText: {
    color: "#888",
    marginTop: 10,
  },
});
