import {createSwitchNavigator} from 'react-navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import name from './screen/name';
import add_res from './screen/add_res';
import added from './screen/added';
import {NavigationContainer} from '@react-navigation/native';
import React,{Component, Fragment} from 'react';

const mainStack = createBottomTabNavigator();

function mainStackScreen(){
  return(
    <mainStack.Navigator initialRouteName = 'add_res'
    tabBarOptions={{
      labelStyle:{
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
      },
      style:{
        position:'absolute',
        bottom:40,
        right:20,
        left :20,
        elevation:10,
        borderRadius: 15,
        height:30,
        shadowColor:'black',
        shadowRadius:200,
        justifyContent:'center',
        alignItems:'center',
      }
    }}
    >
      <mainStack.Screen name = "add_res" component={add_res} options ={{title :'Add Resource',headerLeft: ()=> null}}/>
      <mainStack.Screen name = "added" component={added} options ={{title :'Added',headerLeft: ()=> null}}/>
    </mainStack.Navigator>
  );
}

const loginSwitch = createStackNavigator();

export default function loginSwitchScreen(){
  return(
    <NavigationContainer>
      <loginSwitch.Navigator>
        <loginSwitch.Screen name = "name" component = {name} options ={{headerShown: false,headerLeft: ()=> null}}/>
        <loginSwitch.Screen name = "add_res" component = {mainStackScreen} options ={{headerShown: false,headerLeft: ()=> null}}/>
      </loginSwitch.Navigator>
    </NavigationContainer>
  );
}

/*const login = createSwitchNavigator({
  name : {screen:name},
  res:{screen:add_res},
},{
  initialRouteName: 'name'
});*/

 