import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SearchScreen from "../screen/SearchScreen";
import HomeScreen from "../screen/HomeScreen";
import LibraryScreen from "../screen/LibraryScreen";

class ScreenManager {

  constructor() {
    this.screens = {
      Home: {
        component: HomeScreen,
        icon: {
          component: Entypo,
          name: "home",
        },
      },
      Search: {
        component: SearchScreen,
        icon: {
          component: Ionicons,
          name: "search",
        },
      },
      Library: {
        component: LibraryScreen,
        icon: {
          component: MaterialCommunityIcons,
          name: "bookshelf",
        },
      },
    };

    this.active = "Home";
    this.listeners = [];
  }

  getIcon(name) {
    return this.screens[name].icon;
  }

  getActiveScreen() {
    return this.screens[this.active].component;
  }

  getActiveName() {
    return this.active;
  }

  getScreens() {
    return Object.keys(this.screens);
  }

  setScreen(name) {
    if (!this.screens[name]) {
      return;
    }

    this.active = name;
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

}

export default new ScreenManager();
