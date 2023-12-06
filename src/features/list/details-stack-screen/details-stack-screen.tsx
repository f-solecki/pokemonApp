import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

import { Image } from "expo-image";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

import { PokemonDetails } from "../../../models/models";
import { showToast } from "../../../common/toast";

export const DetailsStackScreen = () => {
  const route = useRoute();
  const params = route.params as { pokemon: PokemonDetails };
  const pokemon = params.pokemon;

  const [favouritePokemon, setFavouritePokemon] = useState<PokemonDetails>();

  const addToFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("favPokemon");
      if (value !== null) {
        setFavouritePokemon(JSON.parse(value));

        showToast({
          title: "Favourite already chosen",
          description: "You can only have one favourite pokemon",
          type: "error",
        });
      } else {
        await AsyncStorage.setItem("favPokemon", JSON.stringify(pokemon));

        setFavouritePokemon(pokemon);

        showToast({
          title: "Favourite chosen",
          description: "You have chosen a favourite pokemon",
          type: "success",
        });
      }
    } catch (e) {
      console.error("Cannot read favourites from AsyncStorage");
    }
  };

  const removeFromFavourites = async () => {
    try {
      await AsyncStorage.removeItem("favPokemon");
      showToast({
        title: "Favourite removed",
        description: "You have removed your favourite pokemon",
        type: "success",
      });
    } catch (e) {
      console.error("Cannot remove favourites from AsyncStorage");
    } finally {
      setFavouritePokemon(undefined);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{pokemon.name}</Text>

        <TouchableOpacity
          onPress={
            favouritePokemon?.name === pokemon.name
              ? removeFromFavourites
              : addToFavourites
          }
        >
          <Icon
            name={favouritePokemon?.name === pokemon.name ? "heart" : "heart-o"}
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
