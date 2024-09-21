import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Correct import for stack navigation
import { NavigationContainer } from '@react-navigation/native'; // Correct import for NavigationContainer
import Home from '../views/Home/home';
// import ArticleDetail from '../views/ArticleDetail';  // Uncomment and import your ArticleDetail when ready



const Stack = createNativeStackNavigator(); // Correct usage of createNativeStackNavigator

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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