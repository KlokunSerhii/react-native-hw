import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";

import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { useRoute } from "./router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoMono-Regular": require("./assets/fonts/RobotoMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(false);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>{routing}</NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
