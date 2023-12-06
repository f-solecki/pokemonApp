import { StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";

import { PokemonDetails } from "../../../models/models";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DetailsStackScreen = () => {
  const route = useRoute();
  const params = route.params as { pokemon: PokemonDetails };
  const pokemon = params.pokemon;
  const isFavourite = false;

  const addToFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("favourites");
      if (value !== null) {
        console.log("You have chosen a favourite");
      } else {
        const favourites = null;
        console.log(favourites);
        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
      }
    } catch (e) {
      // error reading value
      console.error("Cannot read favourites from AsyncStorage");
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{pokemon.name}</Text>

        <TouchableOpacity onPress={addToFavourites}>
          <Image
            source={require(isFavourite
              ? "../../../../assets/heart-full.png"
              : "../../../../assets/heart-outline.png")}
            style={styles.favouriteImage}
          />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: pokemon.imgSrc,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 10,
  },
  favouriteImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginTop: 10,
  },
});
