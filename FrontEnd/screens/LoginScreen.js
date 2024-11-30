import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { validateLogin } from "../utils/Validation";
import { useAuth } from "../hooks/useAuth";
import useUserStore from "../stores/useUserStore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, fetchCurrentUser } = useAuth();
  const { setCurrentUser } = useUserStore();

  const handleLogin = () => {
    const errors = validateLogin({ email, password });

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      Alert.alert("Validation Error", firstError);
      return;
    }

    login({ email, password })
      .then((result) => {
        if (result.success) {
          fetchCurrentUser().then((userResult) => {
            if (userResult.success) {
              setCurrentUser(userResult.user);
              navigation.navigate("Home");
            } else {
              Alert.alert("Error", userResult.error);
            }
          });
        } else {
          Alert.alert("Error", result.error);
        }
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong!" + err);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="leaf" size={40} color="#4CAF50" />
          <Text style={styles.title}>DailyBites</Text>
        </View>
        <Text style={styles.subtitle}>Log in to your account</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={24}
              color="#4CAF50"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#4CAF50"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 20,
  },
});
