import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from "./src/screens/AccountScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from "./src/navigarionRef";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: SignupScreen,
    SignIn: SigninScreen
  }, { defaultNavigationOptions: { headerShown: false }}),
  mainFlow: createBottomTabNavigator({
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetails: TrackDetailsScreen
    })
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </AuthProvider>
  )
}