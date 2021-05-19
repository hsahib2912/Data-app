import React,{Component, Fragment} from 'react';
import {StyleSheet, Text, View, TextInput,Pressable,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class added extends Component {
    
    constructor(props){
        
        super(props);
        this.get_keys();
        
    }
    state = {
        keys : [],
        data : [],
    }
    
    make_data = ()=>{
        const getData = async () => {
            try {
                console.log('hello');
                var tmparr = {};
                for (id in this.state.keys){
                    const d = await AsyncStorage.getItem(this.state.keys[id]);
                    tmparr[this.state.keys[id]] = JSON.parse(d);
                }
                
                this.setState({
                    data:tmparr,
                });
                

            } catch (e) {
                console.log('Error')}
        }    
        getData();
        
    }
    get_keys=() =>{
        const storeData2 = async () => {
            try {
                const allkeys = await AsyncStorage.getAllKeys();
                this.setState({
                    keys:allkeys,
                });
                console.log('Set aa kamm ');
                this.make_data();
            } catch (e) {
                console.log('Error')}
        }    
        storeData2();
    }

    
    render()
    {
        return(
            <Fragment>
            <View style = {styles.container}>
                <Text style = {styles.txt}>Ki gall hoyi? Kamm galat krta ki? Koi na delete krdo</Text>
            </View>
            <View style = {{alignItems:'center',paddingBottom:100}}>
                <Pressable style = {styles.appButtonContainer} onPress = {()=> this.get_keys()}>
                    <Text style = {{color:'white',fontSize:20}}>Submit</Text>
                </Pressable>
            </View>
                
            
            </Fragment>
        );
    
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

  