import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { PokemonListItem } from "../../../../models/models";
import { usePokemonItem } from "./use-pokemon-item";
import { Image } from "expo-image";
import { RootStackParamList } from "../../list";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  item: PokemonListItem & {
    navigation: StackNavigationProp<RootStackParamList>;
  };
};

export const PokemonItem = ({ item }: Props) => {
  const { pokemon } = usePokemonItem(item.url);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => item.navigation.push("Details", { pokemon: pokemon })}
    >
      <Image
        style={styles.image}
        source={{
          uri: pokemon?.imgSrc,
        }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
  },
});
