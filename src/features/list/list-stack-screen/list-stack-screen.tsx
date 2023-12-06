import { useListStackScreen } from "./use-list-stack-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { PokemonItem } from "./pokemon-item/pokemon-item";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../list";

export const ListStackScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  const { list, isLoading, getPokemonList, ref, onRefresh } =
    useListStackScreen();

  return (
    <SafeAreaView>
      <FlatList
        ref={ref}
        data={list}
        refreshing={isLoading}
        onRefresh={onRefresh}
        onEndReached={getPokemonList}
        renderItem={({ item, index }) => {
          const pokemon = {
            ...item,
            navigation: navigation,
          };
          return <PokemonItem key={`${item.name}_${index}`} item={pokemon} />;
        }}
      />
    </SafeAreaView>
  );
};
