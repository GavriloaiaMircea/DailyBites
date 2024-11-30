import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Header from "../components/Header";
import InputField from "../components/InputField";
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
      Alert.alert("Validation Error", Object.values(errors)[0]);
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
      .catch(() => {
        Alert.alert("Error", "Something went wrong!");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Header title="DailyBites" />
        <Text style={styles.subtitle}>Log in to your account</Text>
        <View style={styles.form}>
          <InputField
            iconName="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <InputField
            iconName="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
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
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
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
