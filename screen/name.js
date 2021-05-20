import React,{Component, Fragment} from 'react';
import {StyleSheet, Text, View, TextInput,Pressable,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from "react-native-cache";

const cache = new Cache({
    namespace: "Jatt app",
    policy: {
        maxEntries: 10
    },
    backend: AsyncStorage
});

export default class name extends Component {
    constructor(props){
        super(props);
    }
    state = {
        name:"",
    }
    handleText = (name)=>{
        this.setState({
            name:name,});
        }
    bttnpressed=(name)=>{
        const storeData = async (name) => {
            try {
                const nx = JSON.stringify(name)
                await AsyncStorage.setItem('name', nx)
                console.log('Stored')
                this.props.navigation.navigate('add_res');
            } catch (e) {
                console.log('Error')
                console.log('OO ki hoya?')
            }
        }
        storeData(name);
    }
    render()
    {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('name')
              if(value !== null) {
                console.log(value);
                this.props.navigation.navigate('add_res');
                return value
              }
              else{
                console.log('Haye oYe');
                return null
                }
            } catch(e) {
              console.log('Error')
            }
          }
        a = getData()
        if(a!=null){
            return(
                <Fragment>
                <View style = {styles.container}>
                    <Text style = {styles.txt}>Please enter your name</Text>
                </View>
                
                <TextInput
                    style = {styles.inptxt}
                    placeholderTextColor = 'grey'
                    placeholder="Name"  
                    onChangeText = {(name)=>this.handleText(name)}
                />  
                <View style = {{padding:'10%',alignItems:'center'}}>
                    <Pressable style = {styles.appButtonContainer} onPress = {()=> this.bttnpressed(this.state.name)}>
                        <Text style = {{color:'white',fontSize:20}}>Submit</Text>
                    </Pressable>
                </View>
                </Fragment>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      //flex:1,
      alignItems: 'center',     //for aligning columnwise
      padding : '10%',
      paddingTop:'20%',
    },
    txt:{
        fontSize : 30,
        fontWeight : 'bold'
    },
    inptxt:{
        fontSize : 20,
        margin : 20,
        height: 60,
        textAlign :'center',
        borderColor: '#007AFF',
        borderWidth: 5
    },
    appButtonContainer: {
        alignItems: 'center',
        width:'50%',
        backgroundColor: "#007AFF",
        borderRadius: 100,
        paddingVertical: 20,
        
      }
  });

  