import * as React from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, Platform, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import config from "../config/firebaseCongfig";
import firebase from "firebase";
import { Button, Card, Title, Paragraph, Appbar, Avatar } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";



const firebaseConfig = {
  apiKey: "AIzaSyAUowyCkGQud44YYIIAxqA4np-pDSUIuqI",
  authDomain: "hku-search-u-d8930.firebaseapp.com",
  projectId: "hku-search-u-d8930",
  storageBucket: "hku-search-u-d8930.appspot.com",
  messagingSenderId: "1095126818076",
  appId: "1:1095126818076:web:93d410d1dd6608119aaed9",
  measurementId: "G-JBVW482ZSN",
  databaseURL: "https://hku-search-u-d8930-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const typeMapping = {
  elecDev: "Electronic Device",
  walletOrCreditCard: "Wallet/Credit Card",
  sidCard: "Student ID Card",
  octopus: "Octopus",
  clothes: "Clothes",
  umbrella : "Umbrella",
  waterBottle: "Water Bottle",
  love: "Love",
  others: "Others",
}


const HomeStackScreen = ({ navigation }) => {
  let dataLo = [];
  // let locationKey = [{"key": "HKU"}];
  const [locationKey, setlocationKey] = React.useState("");
  const [records, setrecords] = React.useState("");
  const [urls, setUrls] = React.useState("");
  

  var getData = () => {
    let locationKeyTemp = [];
    let recordsTemp = {};
    let urlsTemp = {};
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref("location")
      .on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          //console.log(childSnapshot);
          locationKeyTemp.push(childSnapshot.key);
          recordsTemp[childSnapshot.key] = childSnapshot.val();
        });
        // sortData();
        //console.log("1"+locationKeyTemp);
        locationKeyTemp.sort((a,b) => a < b );
        //console.log("2"+locationKeyTemp);
        setrecords(recordsTemp);
        setlocationKey(locationKeyTemp);
      });
      // locationKeyTemp.forEach(key => {
      //   urlsTemp[key] = this.getImage(key);
  
      // })
      // setUrls(urlsTemp);
  }


  //Bug here
  const [listOfKey, setlistofKey] = React.useState(() => {
    let locationKeyTemp = [];
    let recordsTemp = {};
    let urlsTemp = {};
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref("location")
      .on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          //console.log(childSnapshot);
          locationKeyTemp.push(childSnapshot.key);
          recordsTemp[childSnapshot.key] = childSnapshot.val();
        });
        // sortData();
        //console.log(locationKeyTemp);
        locationKeyTemp.sort((a,b) => a < b );
        //console.log(locationKey);
        setrecords(recordsTemp);
        setlocationKey(locationKeyTemp);
      });
    
    // locationKeyTemp.forEach(key => {
    //   urlsTemp[key] = this.getImage(key);

    // })
    // setUrls(urlsTemp);
  })

  // getImage = async (key) => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app();
  //   }
  //   let ref = await firebase.storage().ref("images/"+key+".jpg");
  //   let url = ref.getDownloadURL()
  //     .then(url => {console.log(url);})
  //     .catch(e=>{console.log(e);})
  //   return url;
  // };

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.Content title="Records" subtitle={'All Records'} />
        <Appbar.Action icon="refresh" onPress={getData} />
      </Appbar.Header>
      <ScrollView>
        <FlatList data={locationKey} renderItem={({item}) => 
          <Card style={styles.card}>
            <Image source={urls[item]} style={styles.image} />
            <Card.Title title={typeMapping[records[item].type]} subtitle={records[item].date}/>
            <Card.Content>
              <Title>{records[item].description}</Title>
              <Paragraph>Location: {records[item].location}</Paragraph>
              <Paragraph>Detailed Lcoation: {records[item].detailedLocation}</Paragraph>
              <Paragraph>Retrieve: {records[item].retrieve}</Paragraph>
            </Card.Content>
          </Card>
        }/>
        
      </ScrollView>
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
  card: {
    marginBottom: 10,
  },
  view: {
    marginBottom: 80,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'contain'
  }
});

export default HomeStackScreen;
