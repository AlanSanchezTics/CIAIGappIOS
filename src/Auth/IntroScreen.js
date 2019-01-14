import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 241,
  }
});

const slides = [
  {
    key: 'page1',
    title: 'CIAIGapp Renovada',
    text: 'CIAIGapp Tiene un nuevo aspecto\n para una mejor comodidad.',
    image: require('../resources/slides/slide1.png'),
    imageStyle:{width:72,height:72},
    titleStyle:{fontWeight:"bold", color:"#fff"},
    backgroundColor: '#3A79F7',
  }
  ,{
    key: 'page2',
    title: 'Tu información Segura',
    text: 'La información de tu hijo\n actualizada en el momento.',
    image: require('../resources/slides/slide2.png'),
    imageStyle: styles.image,
    titleStyle:{color:"#fff"},
    backgroundColor: '#3A79F7',
  },
  {
    key: 'page3',
    title: 'Mantente Informado',
    text: 'Accede a los avisos que el colegio\n tiene para ti de una forma sencilla.\n Mantenete informado de lo que sucede al momento.',
    image: require('../resources/slides/slide3.png'),
    imageStyle: styles.image,
    titleStyle:{color:"#fff"},
    backgroundColor: '#3A79F7',
  },
  {
    key: 'page4',
    title: 'La formación de tu hijo es lo mas importante',
    text: 'Las tareas que los docentes tienen \npara tu hijo siempre a la mano.\n La formación es lo mas importante.',
    image: require('../resources/slides/slide4.png'),
    imageStyle: styles.image,
    titleStyle:{color:"#fff",textAlign:"center"},
    backgroundColor: '#3A79F7',
  },{
    key: 'page5',
    title: 'Calificaciones al momento',
    text: 'Estate al tanto como va tu hijo en cuanto a su evaluación.',
    image: require('../resources/slides/slide5.png'),
    imageStyle: styles.image,
    titleStyle:{color:"#fff",textAlign:"center"},
    backgroundColor: '#3A79F7',
  },{
    key: 'page6',
    title: 'Tus pagos jamas se atrazarán',
    text: 'Informate de las fechas del pago y mantente al corriente.',
    image: require('../resources/slides/slide6.png'),
    imageStyle: styles.image,
    titleStyle:{color:"#fff",textAlign:"center"},
    backgroundColor: '#3A79F7',
  },{
    key: 'page7',
    title: 'CIAIGapp',
    text: 'Informate de las fechas del pago y mantente al corriente.',
    image: require('../resources/slides/slide7.png'),
    imageStyle: {width:450,height:290},
    titleStyle:{color:"#fff",textAlign:"center",fontWeight:"bold"},
    backgroundColor: '#3A79F7',
  }
];

export default class App extends React.Component {
    constructor(props){
        super(props);
    }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    //this.setState({ showRealApp: true });
    AsyncStorage.setItem("ShowRealApp","true");
    this.props.navigation.navigate('AuthLoading');
  }
  render() {
      return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
  }
}