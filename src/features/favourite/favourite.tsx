import { StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";

import { PokemonDetails } from "../../models/models";
import { Image } from "expo-image";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const FavouriteScreen = () => {
  const isFavourite = false;
  const [pokemon, setPokemon] = useState<PokemonDetails>();

  const readFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("favourites");
      console.log(value);
      if (value !== null) {
        setPokemon(JSON.parse(value));
      } else {
        console.log("No favourites found");
      }
    } catch (e) {
      // error reading value
      console.error(e);
      console.error("Cannot read favourites from AsyncStorage");
    }
  };

  readFavourites();

  return (
    <GestureHandlerRootView>
      {pokemon ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>{pokemon?.name}</Text>

            <TouchableOpacity onPress={() => console.log("Add")}>
              <Image
                source={require(isFavourite
                  ? "../../../assets/heart-full.png"
                  : "../../../assets/heart-outline.png")}
                style={styles.favouriteImage}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: pokemon?.imgSrc,
            }}
          />
        </>
      ) : null}
    </GestureHandlerRootView>
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
