import { useQuery } from "@apollo/client";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { GET_PRODUCTBYID } from "../config/queries";
import Swiper from "react-native-swiper";
export default function Detail({ navigation, route }) {
  const { productId } = route.params;
  const { loading, data, error } = useQuery(GET_PRODUCTBYID, {
    variables: {
      id: +productId,
    },
  });
  if (loading)
    return (
      <View style={styles.container}>
        <Text>LOADING..</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Swiper style={styles.swiperContainer}>
        {data?.getProduct.Images.map((image) => (
          <Image
            key={image.id}
            source={{ uri: image.imgUrl }}
            style={styles.image}
          />
        ))}
      </Swiper>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data?.getProduct.name}</Text>
        <Text style={styles.description}>{data?.getProduct.description}</Text>
        <Text style={styles.price}>
          IDR {data?.getProduct.price.toLocaleString("id-ID")}
        </Text>
        <Text style={styles.category}>{data?.getProduct.Category.name}</Text>
        <Text> posted By: {data?.getProduct.Author.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  swiperContainer: {
    height: 200,
    marginBottom: 20,
  },
  image: {
    flex: 1,
  },
  detailsContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
  },
});
