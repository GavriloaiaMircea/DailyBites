import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { useFoodDetails } from "../hooks/useFoodDetails";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function FoodDetailsScreen({ route }) {
  const { id } = route.params;
  const { details, fetchFoodDetails, loading, error } = useFoodDetails();

  useEffect(() => {
    fetchFoodDetails(id);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.centered}>
        <Ionicons name="information-circle-outline" size={48} color="#4CAF50" />
        <Text style={styles.noDataText}>No details available.</Text>
      </View>
    );
  }

  const {
    name,
    servingSize,
    calories,
    macronutrients,
    micronutrients,
    otherNutrients,
    imageUrl,
  } = details;

  const renderNutrientSection = (title, nutrients) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {Object.entries(nutrients).map(([key, value]) => (
        <View key={key} style={styles.nutrientRow}>
          <Text style={styles.nutrientName}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Text style={styles.nutrientValue}>
            {value} {title === "Macronutrients" ? "g" : "mg"}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: imageUrl || "https://via.placeholder.com/150" }}
          style={styles.image}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>Serving Size: {servingSize}</Text>
          <View style={styles.calorieBox}>
            <Ionicons name="flame-outline" size={24} color="#FF6B6B" />
            <Text style={styles.calorieText}>{calories} calories</Text>
          </View>
        </View>
      </View>

      {renderNutrientSection("Macronutrients", macronutrients)}
      {renderNutrientSection("Micronutrients", micronutrients)}
      {renderNutrientSection("Other Nutrients", otherNutrients)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
  },
  calorieBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    padding: 8,
    borderRadius: 8,
  },
  calorieText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginLeft: 8,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 12,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nutrientName: {
    fontSize: 16,
    color: "#333333",
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#4CAF50",
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
  },
});
