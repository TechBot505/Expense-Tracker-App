import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFont } from 'expo-font';

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { useFonts } from 'expo-font';
import AppLoding from 'expo-app-loading';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  const [fontsLoaded] = useFonts({
    'M-100' : require('./assets/fonts/Montserrat_100Thin.ttf'),
    'M-200' : require('./assets/fonts/Montserrat_200ExtraLight.ttf'),
    'M-300' : require('./assets/fonts/Montserrat_300Light.ttf'),
    'M-400' : require('./assets/fonts/Montserrat_400Regular.ttf'),
    'M-500' : require('./assets/fonts/Montserrat_500Medium.ttf'),
    'M-600' : require('./assets/fonts/Montserrat_600SemiBold.ttf'),
    'M-700' : require('./assets/fonts/Montserrat_700Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoding />;
  }

  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerTitleStyle: {fontFamily: 'M-700'},
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarLabelStyle: { fontFamily: 'M-500'},
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerTitleAlign: 'center',
      headerRight: ({tintColor}) => (<IconButton icon="add" size={24} color={tintColor}  onPress={() => { navigation.navigate('ManageExpenses') }} />)
    })}>
      <BottomTabs.Screen 
        name='RecentExpenses' 
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarIcon: ({color, size}) => (<Ionicons name="hourglass" size={size} color={color} />)
        }}
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses} 
        options={{
          title: 'All Expenses',
          tabBarIcon: ({color, size}) => (<Ionicons name="calendar" size={size} color={color} />)
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
          <Stack.Screen 
             name='ExpensesOverview' 
             component={ExpensesOverview} 
             options= {{
               headerShown: false
             }} 
          />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
            headerTitleStyle: {fontFamily: 'M-700'},
            title: 'Manage Expense',
            presentation: 'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
