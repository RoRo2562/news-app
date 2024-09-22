import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Correct import for stack navigation
import { NavigationContainer } from '@react-navigation/native'; // Correct import for NavigationContainer
import Home from '../views/Home/home';
import Login from '../views/Login/login'; 




const Stack = createNativeStackNavigator(); // Correct usage of createNativeStackNavigator

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        {/* 
          Uncomment and fix the ArticleDetail component when ready:
          
          <Stack.Screen 
            name="ArticleDetail" 
            component={ArticleDetail} 
            options={{ title: 'Article Detail' }} 
          />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;