import React from 'react';
import { StyleSheet, View, StatusBar, Modal, TouchableOpacity, ScrollView , Dimensions} from 'react-native';
import AppNavigator from './src/navigation/TabBarNavigation.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Moment from 'moment';
import {Card, CardItem, Body, Text } from 'native-base';
export default class App extends React.Component {
  state = {
    modalNotificationVisible: true,
    rowData:[]

  }
  onOpened(visible) {
    this.setState({ modalNotificationVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Modal
          animationType={"slide"}
          presentationStyle={"overFullScreen"}
          transparent={false}
          visible={this.state.modalNotificationVisible}>
          <View style={[styles.modal, styles.modal4]}>
            <TouchableOpacity onPress={() => { this.onOpened(false) }} style={[styles.btn, styles.btnModal]}><AntDesign name="close" size={25} color={"black"} /></TouchableOpacity>
            <ScrollView style={{margin:50}}>
            <Card>
              <CardItem>
                <Body>
                  <Text style={{ fontSize: 24 }}>{this.state.rowData.Title}</Text>
                  <Text note>{Moment(this.state.rowData.FechaI).format('LL')}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={{ fontSize: 12 }}>{this.state.rowData.body}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text note style={{ fontWeight: "bold" }}>para el {Moment(this.state.rowData.FechaF).format('LL')}</Text>
              </CardItem>
            </Card>
            </ScrollView>
          </View>
        </Modal>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF"
  },
  modal4: {
    height: 300
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent"
  }
});
