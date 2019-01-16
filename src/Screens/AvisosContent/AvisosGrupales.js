import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, RefreshControl,ActivityIndicator, AsyncStorage } from 'react-native';
import { Text, List, Card, CardItem, Body } from 'native-base';
import Moment from 'moment';
import 'moment/locale/es';
import URL from '../../navigation/ServerURL';

export default class AvisosGrupales extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            lostConnection: false,
            isEmpty: false,
            dataSource: [],
        };
    }
    getDataApi = async () =>{
        let idGrupo = await AsyncStorage.getItem("idGrupo");
        fetch(`${URL}/cPanel/AvisosPanel/AvisosGrupales.php`, {
            method: "post",
            header: {
                "Accept": "application/json",
                "content-type": "application/json",
            },body: JSON.stringify({
                grado: idGrupo
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson != null) {
                this.setState({
                    refreshing: false,
                    dataSource: responseJson
                });
            } else if (responseJson == null) {
                this.setState({
                    refreshing: false,
                    isEmpty:true
                });
            }
        })
        .catch((err) =>{
            console.error(err);
            this.setState({refreshing:false, lostConnection:true});
        })
    }
    componentDidMount(){
        this.getDataApi();
    }
    _onRefresh = () => {
        this.setState({refreshing: true, lostConnection:false, isEmpty:false});
        this.getDataApi();
      }
      render() {
        Moment.locale('es');
        if (!this.state.lostConnection && !this.state.isEmpty && !this.state.refreshing) {
            return (
                <View style={styles.container}>
                    <List
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        dataArray={this.state.dataSource}
                        renderRow={(rowData) =>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text style={{ fontSize: 24 }}>{rowData.titulo}</Text>
                                        <Text note>{Moment(rowData.fechaEm).format('LL')}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text style={{fontSize:13}}>{rowData.descripcion}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Text note style={{ fontWeight: "bold" }}>para el {Moment(rowData.fechaAC).format('LL')}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            );
        } else if (this.state.lostConnection) {
            return (
                <View style={styles.containerError}>
                    <Image source={require("../../resources/ic_lost_connection.png")} style={{ tintColor: "#aaa", width: 100, height: 100 }} />
                    <Text style={{ color: "#aaa", fontSize: 34 }}>Error de red :(</Text>
                    <TouchableOpacity  onPress={() => {this._onRefresh();}} style={{ borderWidth: 1, borderRadius: 5, borderColor: "#aaa", marginTop: 10 }}>
                        <Text style={{ margin: 10, color: "#aaa" }}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.isEmpty) {
            return (
                <View style={styles.containerError}>
                    <Image source={require("../../resources/ic_empty.png")} style={{ tintColor: "#aaa", width: 100, height: 100 }} />
                    <Text style={{ color: "#aaa", fontSize: 34 }}>Sin publicaciones</Text>
                    <TouchableOpacity  onPress={() => {this._onRefresh();}} style={{ borderWidth: 1, borderRadius: 5, borderColor: "#aaa", marginTop: 10 }}>
                        <Text style={{ margin: 10, color: "#aaa" }}>Recargar</Text>
                    </TouchableOpacity>
                </View>
            );
        }else if(this.state.refreshing){
            return(
                <View style={styles.containerError}>
                    <ActivityIndicator size="large"/>
                    <Text style={{ color: "gray" }}>Obteniendo Avisos...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(180,180,180,0.185)",
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