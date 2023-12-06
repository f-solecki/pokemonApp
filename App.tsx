import Icon from "react-native-vector-icons/FontAwesome";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { FavouriteScreen } from "./src/features/favourite/favourite";
import { ListScreen } from "./src/features/list/list";
import { MapScreen } from "./src/features/map/map";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
