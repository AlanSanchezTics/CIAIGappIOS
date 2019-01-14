import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, AsyncStorage, AlertIOS } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import URL from '../navigation/ServerURL.js';

var nGrupo = "";
export default class PerfilScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mi perfil",
      headerLeft: <Image source={require("../resources/toolbarlogo.png")} style={{ marginLeft: 10 }} />,
      headerRight: <TouchableOpacity onPress={navigation.getParam('logOut')}><Text style={{ color: "#fff", margin: 10 }}>cerrar sesión</Text></TouchableOpacity>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#3A79F7",
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      lostConnection: false,
    }
  }
  getDataApi = async () => {
    let id = await AsyncStorage.getItem("idAlumno");
    nGrupo = await AsyncStorage.getItem("nGrupo");
    fetch(`${URL}/cPanel/AlumnosPanel/getDatosApp.php`, {
      method: 'post',
      header: {
        "Accept": "application/json",
        "content-type": "application/json",
      }, body: JSON.stringify({
        idAlumno: id
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.telefono == "" || responseJson.telefono==null) {
          AlertIOS.prompt(
            'Ingresa tu Telefono',
            'Como parte de la integración de los padres de familia con el colegio, te invitamos a proporcionar tu numero telefonico para tener una mejor comunicación',
            [
              {
                text: 'Registrar',
                onPress: (telefono) => {fetch(`${URL}/insertAdicionalData.php?sql=UPDATE tbl_alumnos SET TEL="${telefono}" WHERE ID_ALUMNO=${id}`,{
                  method:'get',
                  header: {
                    "Accept": "application/json",
                    "content-type": "application/json",
                  }
                });
                this._onRefresh();},
              },
            ],
            'plain-text',
          );
        } else if (responseJson.correo == "" || responseJson.correo == null) {
          AlertIOS.prompt(
            'Ingresa tu Correo',
            'Como parte de la integración de los padres de familia con el colegio, te invitamos a proporcionar tu correo electronico para tener una mejor comunicación',
            [
              {
                text: 'Registrar',
                onPress: (correo) => {fetch(`${URL}/insertAdicionalData.php?sql=UPDATE tbl_alumnos SET EMAIL="${correo}" WHERE ID_ALUMNO=${id}`,{
                  method:'get',
                  header: {
                    "Accept": "application/json",
                    "content-type": "application/json",
                  }
                });
                this._onRefresh();},
              },
            ],
            'plain-text',
          );
        } else {
          if (responseJson.nivel == 1) {
            responseJson.nivel = "Preescolar";
          } else if (responseJson.nivel == 2) {
            responseJson.nivel = "Primaria";
          }
          this.setState({
            refreshing: false,
            dataSource: responseJson
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({ refreshing: false, lostConnection: true })
      })
  }
  componentDidMount() {
    this.getDataApi();
    this.props.navigation.setParams({ logOut: this.logOut });
  }
  _onRefresh() {
    this.setState({ refreshing: true, lostConnection: false });
    this.getDataApi();
  }
  logOut = async () => {
    let idAlumno = await AsyncStorage.getItem("idAlumno");
    fetch(`${URL}/logoutApp.php`, {
      method: "post",
      header: {
        "Accept": "application/json",
        "content-type": "application/json",

      },
      body: JSON.stringify({
        idAlumno: idAlumno
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == true) {
          AsyncStorage.clear();
          this.props.navigation.navigate('AuthLoading');
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    if (!this.state.refreshing && !this.state.lostConnection) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer} >
              <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>Colegio Indira Gandhi</Text>
              <Text style={{ textAlign: "center", color: "#000", fontStyle: "italic" }}>"Un buen principio para un futuro brillante"</Text>
              <Text style={{ color: "#D0D0D0", textAlign: "center" }}>Ciclo escolar 2018-2019</Text>
              <View style={{ alignItems: "center" }}>
                <Image borderRadius={50} source={require("../resources/default.png")} style={{ marginVertical: 10, width: 100, height: 100 }} />
                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>{this.state.dataSource.name} {this.state.dataSource.A_paterno} {this.state.dataSource.A_materno}</Text>
              </View>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Grupo</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.grado}°{nGrupo}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Nivel de estudio</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.nivel}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Telefono</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.telefono}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Correo</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.correo}</Text>
                  </Body>
                </CardItem>
              </Card>
            </View>
          </ScrollView>
        </View>
      );
    } else if (this.state.refreshing) {
      return (
        <View style={styles.containerError}>
          <ActivityIndicator size="large" />
          <Text style={{ color: "gray" }}>Obteniendo datos del alumno...</Text>
        </View>
      );
    } else if (this.state.lostConnection) {
      return (
        <View style={styles.containerError}>
          <Image source={require("../resources/ic_lost_connection.png")} style={{ tintColor: "#aaa", width: 100, height: 100 }} />
          <Text style={{ color: "#aaa", fontSize: 34 }}>Error de red :(</Text>
          <TouchableOpacity onPress={() => { this._onRefresh(); }} style={{ borderWidth: 1, borderRadius: 5, borderColor: "#aaa", marginTop: 10 }}>
            <Text style={{ margin: 10, color: "#aaa" }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(240, 240, 240, 0.185)",
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
  containerError: {
    flex: 1,
    backgroundColor: "rgba(180,180,180,0.185)",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  }
});
