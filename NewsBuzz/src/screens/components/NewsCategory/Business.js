import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  StatusBar,
  Alert,
  RefreshControl
} from "react-native";
import TravelGuide from "../Guide/TravelGuide";
import { ScrollView } from "react-native-gesture-handler";

import { AppRegistry, FlatList, StyleSheet } from "react-native";

export default class business extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      refreshing: false
    };
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    // const response = await fetch("http://10.113.50.196:9000/api/news");
    const response = await fetch("http://192.168.0.100:9000/api/bussiness");
    const data = await response.json();
    this.setState({
      data: data,
      refreshing: false
    });
    // console.log(this.state.data);
  };
  render() {
    return (
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <FlatList
          data={this.state.data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TravelGuide
              placeUri={{
                uri: item.img
                // "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }}
              placeName={item.tilte}
              placeDes={item.discription}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
