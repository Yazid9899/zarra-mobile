import { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import Cards from "../components/Cards";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../config/queries";
export default function Home() {
  const { loading, data } = useQuery(GET_PRODUCTS);

  if (loading)
    return (
      <View style={styles.container}>
        <Text>LOADING..</Text>
      </View>
    );
  return (
    <View>
      <FlatList
        data={data?.getProducts}
        renderItem={({ item }) => <Cards product={item} />}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
