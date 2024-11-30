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
import HeaderHomeScreen from "../components/HeaderHomeScreen";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser, clearUser } = useUserStore();
  const userName = currentUser?.name || "Guest";
  const { results, search, error, loading } = useSearch();

  const handleSearch = () => {
    search(searchQuery);
  };

  const handleLogout = () => {
    clearUser();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHomeScreen userName={userName} onLogout={handleLogout} />
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
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
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
