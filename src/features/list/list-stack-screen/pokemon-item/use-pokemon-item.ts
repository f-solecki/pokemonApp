import { useEffect, useState } from "react";
import { PokemonDetails } from "../../../../models/models";

export const usePokemonItem = (url: string) => {
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetails>();

  const getPokemon = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setPokemon({ name: json.name, imgSrc: json.sprites["front_default"] });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
