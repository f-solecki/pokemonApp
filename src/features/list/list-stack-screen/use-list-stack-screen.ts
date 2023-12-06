import { useEffect, useRef, useState } from "react";

import { PokemonListItem } from "../../../models/models";
import { useScrollToTop } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

interface ListProps {
  data: string;
  type: number;
  id: number;
}

export const useListStackScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [next, setNext] = useState<string>("https://pokeapi.co/api/v2/pokemon");
  const ref = useRef<FlatList>(null);

  const getPokemonList = async () => {
    try {
      const response = await fetch(next);
      const json = await response.json();
      setNext(json.next);
      setList(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      ref.current?.scrollToIndex({ index: 0 });
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return {
    isLoading,
    list,
    getPokemonList,
    ref,
  };
};
