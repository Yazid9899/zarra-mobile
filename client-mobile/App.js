import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
