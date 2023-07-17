import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Cards({ product }) {
  const navigation = useNavigation();
  const seeProductDetail = (id) => {
    navigation.push("Detail", {
      productId: id,
    });
  };

  const toRupiah = (value) => {
    return value.toLocaleString("id-ID");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={product.id}
        style={styles.card}
        onPress={() => {
          seeProductDetail(product.id);
        }}
      >
        <Image source={{ uri: product.mainImg }} style={styles.image} />
        <View style={styles.cardBody}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.price}>IDR {toRupiah(product.price)}</Text>
            <Text style={styles.category}>{product.Category.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  cardBody: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 16,
  },
});
