import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFoodDetails } from "../hooks/useFoodDetails";

export default function FoodDetailsScreen({ route }) {
  const { id } = route.params; // ID-ul produsului selectat
  const { details, fetchFoodDetails, loading, error } = useFoodDetails();

  useEffect(() => {
    fetchFoodDetails(id);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.centered}>
        <Text>No details available.</Text>
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
  } = details;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Serving Size: {servingSize}</Text>
      <Text style={styles.subtitle}>Calories: {calories}</Text>

      <Text style={styles.sectionTitle}>Macronutrients</Text>
      {Object.entries(macronutrients).map(([key, value]) => (
        <Text key={key} style={styles.text}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value} g
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Micronutrients</Text>
      {Object.entries(micronutrients).map(([key, value]) => (
        <Text key={key} style={styles.text}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value} mg
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Other Nutrients</Text>
      {Object.entries(otherNutrients).map(([key, value]) => (
        <Text key={key} style={styles.text}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value} mg
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
