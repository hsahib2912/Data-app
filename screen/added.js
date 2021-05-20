import React,{Component, Fragment} from 'react';
import {StyleSheet, Text, View, TextInput,Pressable,FlatList, TouchableOpacity,Dimensions, ScrollView,Alert } from 'react-native';
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from '/Users/harkishansingh/Desktop/react/data-app/firebase.js';
import 'firebase/firestore';
import * as firebase from 'firebase';

const { height, width } = Dimensions.get("window");
const Resources_coll = firebase.firestore().collection('Resources');
export default class added extends Component {
    
    constructor(props){
        super(props);
        //this.get_keys();
        
        
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.get_keys();
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }
    
    
    state = {
        keys : [],
        data : [],
    }
    
    make_data = ()=>{
        const getData = async () => {
            try {
                //console.log('hello');
                var tmparr = [];
                for (id in this.state.keys){
                    const d = await AsyncStorage.getItem(this.state.keys[id]);
                    if(this.state.keys[id]!='name'){
                        var k = JSON.parse(d);
                        k.key = this.state.keys[id];
                        //console.log(k);
                        tmparr.push(k);
                    }
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
                //console.log('Set aa kamm ');
                this.make_data();
            } catch (e) {
                console.log('Error')}
        }    
        storeData2();
    }
    delete_from_cache=(key)=>{
        const deldata = async () => {
            try {
              await AsyncStorage.removeItem(key);
              console.log("Deleted from Cache");
            }catch(e){
                console.log('Error removing from cache');
            }
        }
        deldata();

    }
    delete_from_firebase=(key)=>{
        Resources_coll.doc(key).delete().then(()=>{console.log('deleted!!')});
    }
    removeItem = (key) => {
        console.log(key);
        Alert.alert(  
            'Sure you want to delete',
            '',
            [  
                {  
                    text: 'Yes',  
                    onPress: () => {
                        let arr = this.state.data.filter((item)=> {
                            return item.key !== key
                            });
                            console.log(arr);
                            this.setState({
                                data:arr,
                            });
                        this.delete_from_firebase(key);
                        this.delete_from_cache(key);

                    },  
                    style: 'cancel',  
                },  
                {text: 'No', onPress: () => console.log('OK Pressed')},  
            ]  
        ); 
        
      };
    render()
    {
        return(
            <ScrollView>
            <View style = {styles.container}>
                <Text style = {styles.txt}>Delete the entries if you entered data incorrectly!</Text>
            </View>
            <View style = {{alignItems:'center',paddingBottom:100}}>
            <FlatList
                contentContainerStyle = {styles.flatList}        
                data = {this.state.data}
                renderItem={({item}) =>  
                    <TouchableOpacity 
                    style = {styles.cardContainer}
                    onPress = {()=>this.removeItem(item.key)}
                    >
                        <Card style={[styles.card, {backgroundColor: item.color}]}>
                            <Text style={styles.txt2}>Donor Name :{item.Dname} {"\n"}Phone :{item.Phone} {"\n"}
                            Address : {item.Address} {"\n"}
                            City : {item.City}, Resource : {item.Resource}
                            </Text>
                        </Card>
                    </TouchableOpacity>} 
            />  
            </View>
            
            </ScrollView>
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
    txt2:{
        fontSize : 15,
        fontWeight : 'bold',
        color:'red',
    },
    inptxt:{
        fontSize : 20,
        margin : 20,
        height: 60,
        textAlign :'center',
        borderColor: '#007AFF',
        borderWidth: 5
    },
    flatList: {
        //padding: 50,
        //paddingVertical: 16,
    },
    cardContainer: {
        width: width,
        //marginRight: 8,

      },
    card: {
    //height: 100,
    //width:200,
    //width: width * 0.5,
    //borderRadius: 200,
    //padding: ,
    },
  });
