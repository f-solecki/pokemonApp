import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

import { PokemonListItem } from "../../../models/models";

const FIRST_PAGE_URL = "https://pokeapi.co/api/v2/pokemon";

export const useListStackScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [next, setNext] = useState<string>(FIRST_PAGE_URL);
  const ref = useRef<FlatList>(null);

  const getPokemonList = async () => {
    setLoading(true);

    try {
      const response = await fetch(next);
      const json = await response.json();
      setNext(json.next);
      setList([...list, ...json.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    getPokemonList();
  }, []);

  return {
    isLoading,
    list,
    getPokemonList,
    ref,
    onRefresh,
  };
};
