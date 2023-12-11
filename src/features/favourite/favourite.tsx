import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { showToast } from "../../common/toast";
import { PokemonDetails } from "../../models/models";

export const FavouriteScreen = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails>();

  const readFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("favPokemon");
      if (value !== null) {
        setPokemon(JSON.parse(value));
      }
    } catch (e) {
      console.error("Cannot read favourites from AsyncStorage");
    }
  };

  useFocusEffect(() => {
    readFavourites();
  });

  const removeFromFavourites = async () => {
    try {
      await AsyncStorage.removeItem("favPokemon");

      showToast({
        title: "Favourite removed",
        description: "You have removed a favourite pokemon",
        type: "success",
      });
    } catch (e) {
      console.error("Cannot remove favourites from AsyncStorage");
    } finally {
      setPokemon(undefined);
    }
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        {pokemon ? (
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>{pokemon?.name}</Text>

              <TouchableOpacity onPress={removeFromFavourites}>
                <Icon name="heart" size={30} style={styles.favouriteImage} />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.image}
              source={{
                uri: pokemon?.imgSrc,
              }}
            />
          </>
        ) : (
          <Text style={styles.noFav}>
            No favourite Pokemon chosen. Go to list and add it!
          </Text>
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
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
  noFav: {
    alignSelf: "center",
    marginTop: 10,
  },
});
