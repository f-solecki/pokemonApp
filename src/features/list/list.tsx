import { createStackNavigator } from "@react-navigation/stack";
import { ListStackScreen } from "./list-stack-screen/list-stack-screen";
import { DetailsStackScreen } from "./details-stack-screen/details-stack-screen";
import { PokemonDetails } from "../../models/models";

export type RootStackParamList = {
  ListStackScreen: undefined;
  Details: { pokemon?: PokemonDetails };
};

const Stack = createStackNavigator<RootStackParamList>();

export const ListScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListStackScreen"
        component={ListStackScreen}
        options={{ headerShown: false, headerTitle: "Pokemon List" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsStackScreen}
        initialParams={{ pokemon: { name: "", imgSrc: "" } }}
      />
    </Stack.Navigator>
  );
};
