export type PokemonListItem = {
  name: string;
  url: string;
};
export type PokemonDetails = {
  name?: string;
  imgSrc?: string;
};

export type ToastProps = {
  title: string;
  description: string;
  type: "success" | "error" | "warning" | "info";
};

export type GetListProps = {
  url: string;
};

export type Marker = {
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};
