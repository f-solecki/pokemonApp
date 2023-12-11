import BottomSheetModal from "@gorhom/bottom-sheet";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import RNPickerSelect from "react-native-picker-select";
import { useMethods } from "./use-methods";
import { Image } from "expo-image";

export const MapScreen = () => {
  const {
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
  } = useMethods();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <MapView style={styles.map} onLongPress={openAddingModal}>
          {markers.map((marker, index) => (
            <Marker
              onPress={() => {
                getCurrentPokemonInfo(marker.title);
                pokemonInfoModalRef.current?.expand();
              }}
              key={`${marker.title}_${index}`}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>

        <BottomSheetModal
          ref={pokemonInfoModalRef}
          snapPoints={snapPoints}
          index={0}
        >
          <View style={styles.contentContainer}>
            {pokemonInfo ? (
              <>
                <Text style={styles.modalHeader}>{pokemonInfo?.name}</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: pokemonInfo?.imgSrc,
                  }}
                />
              </>
            ) : (
              <Text>Wybierz pinezkę na mapie, by wyświetlić dane</Text>
            )}
          </View>
        </BottomSheetModal>

        <BottomSheetModal
          ref={addMarkerModalRef}
          snapPoints={snapPoints}
          index={-1}
          style={styles.modal}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.modalHeader}>
              Dodaj znalezionego Pokemona na mapę!
            </Text>

            <View style={styles.select}>
              <RNPickerSelect
                placeholder={{
                  label: "Wybierz pokemona...",
                  value: null,
                }}
                items={list}
                onValueChange={(value) => setChosenPokemonId(value)}
              />
            </View>

            <Button onPress={addMarker} title="Dodaj" />
          </View>
        </BottomSheetModal>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    margin: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modal: {
    padding: 10,
  },
  select: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});
