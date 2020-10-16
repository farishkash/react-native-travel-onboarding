import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardScreen from '../screens/OnboardScreen';
import OnboardEndScreen from '../screens/OnboardEndScreen';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    delay: 1500,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Onboarding screen */}
        <Stack.Screen
          name="OnBoarding"
          component={OnboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardEnd"
          component={OnboardEndScreen}
          options={{
            headerShown: true,
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: forFade,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
