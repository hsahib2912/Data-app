import React,{useState,Component, Fragment} from 'react';
import {StyleSheet, Text, View, TextInput,Pressable,Picker, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import firebaseConfig from '/Users/harkishansingh/Desktop/react/data-app/firebase.js';
import 'firebase/firestore';
import * as firebase from 'firebase';



const Resources_coll = firebase.firestore().collection('Resources');
export default class add_res extends Component {
    constructor(props){
        super(props);
    }
    state = {
        name:"",
        ph : "",
        add : "",
        city : "Delhi",
        res : "Oxygen",
        docid : "",
    }

    handleText = (name,ph,add,city)=>{
        console.log(this.state.city);
        if(name!=""){
            this.setState({
                name:name,});
            }
        if(ph!=""){
            this.setState({
                ph:ph,});
        }
        if(add!=""){
            this.setState({
                add:add,});
            }
        if(city!=""){
            this.setState({
                city:city,});
            }
        }

    setSelectedValueCity = (v)=>{
        this.setState({
            city:v,
        });
        console.log(this.state.city);
        }
    setSelectedValueRes = (v)=>{
        this.setState({
            res:v,
        });
        console.log(this.state.city);
        }

    jio_g=(keys)=>{
        console.log("he hega ha ji "+keys.length);
        var d = new Object();
        d.Dname = this.state.name;
        d.Phone = this.state.ph;
        d.City = this.state.city;
        d.Resource = this.state.res;
        d.Address = this.state.add;
        var jsonString= JSON.stringify(d);
        console.log(keys.length<=5);
        if(keys.length<=5){
            console.log('Hi wasssup');
            console.log(this.state.docid);
            const storeData = async () => {
                try {
                    console.log('Hello guys');
                    await AsyncStorage.setItem(this.state.docid, jsonString)
                    console.log('Stored')
                    console.log('data is stored hapsio');
                    const allkeys = await AsyncStorage.getAllKeys();
                    console.log("All keys is ",allkeys);
                } catch (e) {
                    console.log('Error')
                    console.log('OO ki hoya?')
                }
            }
            console.log('Hi wasssup2222');
            storeData();
        }
        else{
            const storeData2 = async () => {
                try {
                    await AsyncStorage.setItem(this.state.docid, jsonString);
                    if(keys[5]!="name"){
                        await AsyncStorage.removeItem(keys[5]);
                    }
                    else{
                        await AsyncStorage.removeItem(keys[4]);
                    }
                    console.log('Stored and removed');
                    const allkeys = await AsyncStorage.getAllKeys();
                    console.log("All keys is ",allkeys);

                } catch (e) {
                    console.log('Error')
                    console.log('OO ki hoya?')
                }
                
            }
            storeData2();
        }
        
    }
    bttnpressed=(name,add,ph,city,res)=>{
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('name')
              const keys = await AsyncStorage.getAllKeys();
              if(value !== null) {
                console.log(value);
                a = value;
                console.log("Address : "+add);
                console.log("Name = "+name);
                console.log("City = "+city);
                console.log("Upload wale da naam = "+a);
                console.log(ph);
                Resources_coll
                        .add({
                            Address: add,
                            Contact: ph,
                            City : city,
                            Dname:name,
                            Uname:a,
                            Resource : res,
                        })
                        .then(docRef=>  {
                            console.log('User added!');
                            console.log('calling');
                            this.setState({
                                docid : docRef.id,
                            });
                            this.jio_g(keys);
                        });
                
              }
              else{
                //this.props.navigate.navigate('name')
                }
            } catch(e) {
              console.log('Error')
            }
          }
        getData();
        
    }
    render()
    {
        
        return(
            <ScrollView>
            <View style = {styles.container}>
                <Text style = {styles.txt}> Babeo bharo feilds</Text>
            </View>
            
            <TextInput
                style = {styles.inptxt}
                placeholderTextColor = 'grey'
                placeholder="Name of donor"  
                onChangeText = {(name)=>this.handleText(name,"","","")}
                clearButtonMode = 'always'
            />
            <TextInput
                style = {styles.inptxt}
                placeholderTextColor = 'grey'
                placeholder="Phone of donor"  
                onChangeText = {(ph)=>this.handleText("",ph,"","")}
                clearButtonMode = 'always'
            />
            <TextInput
                style = {styles.inptxt}
                placeholderTextColor = 'grey'
                placeholder="Address of donor"  
                onChangeText = {(add)=>this.handleText("","",add,"")}
                clearButtonMode = 'always'
            />
            <Picker
                selectedValue={this.state.city}
                onValueChange={(itemValue) => this.setSelectedValueCity(itemValue)}>
                <Picker.Item label="Delhi" value="Delhi" />
                <Picker.Item label="Mumbai" value="Mumbai" />
            </Picker>

            <Picker
                selectedValue={this.state.res}
                itemStyle = {{color:'red',padding:100}}
                onValueChange={(itemValue) => this.setSelectedValueRes(itemValue)}>
                <Picker.Item label="Oxygen" value="Oxygen" />
                <Picker.Item label="Remdesvir" value="Remdesvir" />
                <Picker.Item label="ICU" value="ICU" />
            </Picker>
            <View style = {{alignItems:'center',paddingBottom:100}}>
                <Pressable style = {styles.appButtonContainer} onPress = {()=> this.bttnpressed(this.state.name,this.state.add,this.state.ph,
                    this.state.city,this.state.res)}>
                    <Text style = {{color:'white',fontSize:20}}>Submit</Text>
                </Pressable>
            </View>
            <Text>Id tuwadi : {this.state.docid}</Text>
            </ScrollView>
        );
    
    }
}

const styles = StyleSheet.create({
    container: {
      //flex:1,
      alignItems: 'center',     //for aligning columnwise
      //padding : '10%',
      paddingTop:'10%',
    },
    txt: {
        paddingTop:'10%',
        fontSize : 30,
        fontWeight : 'bold'
    },
    inptxt:{
        fontSize : 20,
        margin : 15,
        height: 40,
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


