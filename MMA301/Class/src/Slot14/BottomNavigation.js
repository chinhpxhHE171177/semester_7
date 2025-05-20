/*
Tạo dự án:
npx create-expo-app. --template blank 
npx create-expo-app MyApp --template blank
MyApp là tên project của bạn, có thể đổi thành tên khác.
Nếu gặp lỗi, hãy thử cập nhật Node.js hoặc Expo CLI:
npm install -g expo-cli

Cài thư viện:
npm i 
@react-navigation/stack 
@react-native-screens 
@react-native-safe-area-context 
@expo/vector-icons 
npm install @react-navigation/stack @react-native-screens @react-native-safe-area-context @expo/vector-icons

*/
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
const Tab = createBottomTabNavigator();
//define HomeScreen 
function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Home</Text>
            {/* Them cac thanh phan khac  */}
        </View>
    );
}

//define Setting Screen 
function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Settings</Text>
        </View>
    );
}

// App Component
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Settings" component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


