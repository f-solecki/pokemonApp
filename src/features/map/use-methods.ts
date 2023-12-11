import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker, PokemonDetails, PokemonListItem } from "../../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LongPressEvent } from "react-native-maps";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Item } from "react-native-picker-select";

const FIRST_PAGE_URL =
  "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=100";

export const useMethods = () => {
  const [list, setList] = useState<Item[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [chosenPokemonId, setChosenPokemonId] = useState<string>();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonDetails>();
  const [chosenLocation, setChosenLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const pokemonInfoModalRef = useRef<BottomSheetModal>(null);
  const addMarkerModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["5%", "50%"], []);

  const getCurrentPokemonInfo = async (id: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const json = await response.json();
      setPokemonInfo({
        name: json.name,
        imgSrc: json.sprites.front_default,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonList = async () => {
    try {
      const response = await fetch(FIRST_PAGE_URL);
      const json = await response.json();
      const preparedListForPicker = json.results.map(
        (item: PokemonListItem) => ({
          label: item.name,
          value: item.url.split("/")[6],
          key: item.url.split("/")[6],
        })
      );

      setList([...list, ...preparedListForPicker]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPokemonList();
    getMarkers();
  }, []);

  const getMarkers = async () => {
    try {
      const value = await AsyncStorage.getItem("markers");
      if (value !== null) {
        setMarkers(JSON.parse(value));
      }
    } catch (e) {
      console.error("Cannot read markers from AsyncStorage");
    }
  };

  const addMarker = async () => {
    if (chosenPokemonId) {
      const newMarker: Marker = {
        title: chosenPokemonId,
        description: "",
        coordinate: chosenLocation!,
      };

      try {
        const newMarkers = [...markers, newMarker];
        await AsyncStorage.setItem("markers", JSON.stringify(newMarkers));
        setMarkers(newMarkers);
      } catch (e) {
        console.error("Cannot read markers from AsyncStorage");
      } finally {
        setChosenPokemonId(undefined);
        addMarkerModalRef.current?.close();
      }
    }
  };

  const openAddingModal = useCallback((e: LongPressEvent) => {
    setChosenLocation(e.nativeEvent.coordinate);
    addMarkerModalRef.current?.expand();
  }, []);

  return {
    openAddingModal,
    markers,
    pokemonInfoModalRef,
    snapPoints,
    addMarkerModalRef,
    setChosenPokemonId,
    addMarker,
    list,
    pokemonInfo,
    getCurrentPokemonInfo,
  };
};
