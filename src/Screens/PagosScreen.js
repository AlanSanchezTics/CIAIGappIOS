import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, StatusBar,Linking } from 'react-native';
import {Body, Card, CardItem } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class PagosScreen extends React.Component {
  static navigationOptions = {
    title: "Información Adicional",
    headerLeft: <Image source={require("../resources/toolbarlogo.png")} style={{ marginLeft: 10 }} />,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: "#3A79F7",
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      modalDatosVisible: false,
      modalInstruccionesVisible: false,
      statusBarVisible: false
    }
  }

  setModalDatosVisible(visible) {
    this.setState({ modalDatosVisible: visible, statusBarVisible: visible });
  }
  setModalInsVisible(visible) {
    this.setState({ modalInstruccionesVisible: visible, statusBarVisible: visible });
  }
  setStatusBar(visible) {
    this.setState({ statusBarVisible: visible });
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          presentationStyle={"overFullScreen"}
          transparent={false}
          visible={this.state.modalDatosVisible}
        >
          <View style={[styles.modal, styles.modal4]} onTouchEndCapture={() => { this.setStatusBar(!this.state.statusBarVisible) }}>
            <StatusBar
              barStyle="light-content"
              animated={true}
              showHideTransition={"fade"}
              hidden={this.state.statusBarVisible} />
            <TouchableOpacity onPress={() => { this.setModalDatosVisible(false) }} style={[styles.btn, styles.btnModal]}><AntDesign name="close" size={25} color={"white"} /></TouchableOpacity>
            <Card style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
              <Image
                style={{ resizeMode: "stretch", width: 200, height: 87 }}
                source={require("../resources/banco.png")}
              />
              <Text style={{ textAlign: "center", color: "#000", fontWeight: "bold" }}>KINDER MADAM CURIE DE PUERTO VALLARTA AC</Text>
              <Text style={{ color: "#000" }}>Sucursal <Text style={{ fontWeight: "bold" }}>442</Text></Text>
              <Text style={{ color: "#000" }}>N° de cuenta <Text style={{ fontWeight: "bold" }}>92-00188714-7</Text></Text>
              <Text style={{ color: "#000" }}>CLABE <Text style={{ fontWeight: "bold" }}>014375920018871475</Text></Text>
            </Card>
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          presentationStyle={"overFullScreen"}
          transparent={false}
          visible={this.state.modalInstruccionesVisible}>
          <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1, flexDirection:"column" }}>
            <StatusBar
              barStyle="dark-content" />
            <ScrollView>
              <View>
                <Text style={{ fontSize: 34 }}>Instrucciones de Pago</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Colegio</Text>
                <Text style={{ textAlign: "justify" }}>En la administración, presente su tarjetón para hacer su pago en efectivo o tarjeta de crédito/débito.</Text>
                <View style={{ alignItems: "center", flexGrow: 1 }}>
                  <Image source={require("../resources/metodos_pago.png")} style={{ height: 50, width: 150, resizeMode: "stretch" }} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Banco</Text>
                <Text style={{ textAlign: "justify" }}>Presente su tarjeton en cualquier sucursal Santander indicándole al cajero la cantidad tomando en cuenta la fecha de su pago. Conserve su ficha y presente en la oficina del colegio para la emisión de su factura.</Text>
                <View style={{ alignItems: "center", flexGrow: 1 }}>
                  <Image source={require("../resources/deposito_cuenta.png")} style={{ height: 80, width: 80, resizeMode: "stretch" }} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Transferencia</Text>
                <Text style={{ textAlign: "justify" }}>Tome en cuenta la fecha de su pago y envié el comprobante ese mismo día para emisión de su factura al correo:</Text>
                <Text style={{ color: "blue" }}>colegioindiragandhiprimaria@gmail.com</Text>
                <View style={{ alignItems: "center", flexGrow: 1 }}>
                  <Image source={require("../resources/ejemplo.png")} style={{ height: 50, resizeMode: "stretch" }} />
                </View>
              </View>
            </ScrollView>
            <View style={{ alignItems: "center", flexGrow: 1}}>
                  <TouchableOpacity onPress={() =>{this.setModalInsVisible(!this.state.modalInstruccionesVisible);}} style={{borderWidth:2, borderColor:"#3A79F7", paddingVertical:15, paddingHorizontal:30,borderRadius:10}}>
                    <Text>Entendido</Text>
                  </TouchableOpacity>
                </View>
          </View>
        </Modal>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>Colegio Indira Gandhi</Text>
            <Text style={{ textAlign: "center", color: "#000", fontStyle: "italic" }}>"Un buen principio para un futuro brillante"</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>MATERNAL, PREESCOLAR Y PRIMARIA</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>RFC: KMC040813KC1</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>JAMAICA 1505 / GUAYAQUIL 505, COL. LAZARO CARDENAS</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>TELS. 222-35-48 Y 222-01-96</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>PUERTO VALLARTA JAL. C.P 48330</Text>
            <Text style={{ textAlign: "center", color: "#000", fontWeight: "bold", fontSize: 18 }}>calendario de Pagos</Text>
            <Image
              style={{ resizeMode: "stretch", width: Dimensions.get('window').width, height: 200 }}
              source={require("../resources//calendario.png")} />
            <View style={{ flexDirection: "row" }}>
              <Card style={{ alignItems: "center" }}>
                <CardItem cardBody style={{ flexDirection: "column" }} button onPress={() => { this.setModalDatosVisible(!this.state.modalDatosVisible); }}>
                  <Image source={require("../resources/ic_pay.png")} style={{ width: 100, height: 100, resizeMode: "stretch", marginHorizontal: 30, marginTop: 15 }} />
                  <Text style={{ fontWeight: "bold", marginBottom: 15 }}>Datos de Pago</Text>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem cardBody style={{ flexDirection: "column" }} button onPress={() => { this.setModalInsVisible(!this.state.modalInstruccionesVisible); }}>
                  <Image source={require("../resources/ic_instruction.png")} style={{ width: 100, height: 100, resizeMode: "stretch", marginHorizontal: 30, marginTop: 15 }} />
                  <Text style={{ fontWeight: "bold", marginBottom: 15 }}>Instrucciones de Pago</Text>
                </CardItem>
              </Card>
            </View>
            <Card style={{ alignItems: "center" }}>
              <CardItem header>
                <Text style={{ fontWeight: "bold" }}>Reglamento del Plantel</Text>
              </CardItem>
              <CardItem button onPress={() => {Linking.openURL("https://www.ciaigandhi.com/REGLAMENTO18-19.pdf").catch(err =>console.error(err));}}>
                <Body style={{ alignItems: "center" }}>
                  <Image source={require("../resources/ic_reglamento.png")} style={{ width: 100, height: 100, resizeMode: "stretch", tintColor: "#000" }} />
                </Body>
              </CardItem>
            </Card>
            <Text style={{ fontSize: 9, color: "#aaa" }}>Versión 2.0.1.2 Colegio Indira Gandhi® derechos Reservados©</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000"
  },
  modal4: {
    height: 300
  },
  modalIns: {
    backgroundColor: "#aaa",
  }
});