import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./pages/HomeScreen"
import LoginScreen from "./pages/user/LoginScreen"
import UserUpdateScreen from "./pages/user/UserUpdateScreen"
import SignUpScreen from "./pages/user/SignUpScreen"
import ProfileScreen from "./pages/ProfileScreen"
import ChallengeScreen from "./pages/challenge/ChallengeScreen"
import ChallengeCreateScreen from "./pages/challenge/ChallengeCreateScreen"
import ChallengeDetailScreen from "./pages/challenge/ChallengeDetailScreen"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import OctIcon from "react-native-vector-icons/Octicons"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.6,
          shadowRadius: 4,
          elevation: 4,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <AntDesignIcon name="home" style={{ color: focused ? "#ffbe98" : "#404040" }} size={30} />,
          title: "홈",
          headerTitle: "돈워리",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{
          tabBarIcon: ({ focused }) => <OctIcon name="checklist" style={{ color: focused ? "#ffbe98" : "#404040" }} size={30} />,
          title: "챌린지",
          headerTitle: "챌린지 살펴보기",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Board"
        component={ChallengeScreen}
        options={{
          tabBarIcon: ({ focused }) => <MaterialCommunityIcon name="forum-outline" style={{ color: focused ? "#ffbe98" : "#404040" }} size={30} />,
          title: "게시판",
          headerTitle: "게시판 살펴보기",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <AntDesignIcon name="profile" style={{ color: focused ? "#ffbe98" : "#404040" }} size={30} />,
          title: "마이페이지",
          headerTitle: "마이페이지",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserUpdate" component={UserUpdateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChallengeCreate" component={ChallengeCreateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} options={{ headerShown: true, title: "챌린지 상세보기", headerTitleAlign: "center" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
