import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import firebase from '../database/firebase';

class SplashPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
        }
    }

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { resolve('result') },
            1000
          )
        )
    }
    
    async componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            const isLoggedIn = user ? true : false;

            this.setState({
                loggedIn: isLoggedIn
            });
        });          

        const data = await this.performTimeConsumingTask();

        if (data !== null && !this.state.loggedIn) {
            this.props.navigation.navigate('Main');
        } else if (data !== null && this.state.loggedIn) {
            this.props.navigation.navigate('Translate');
        }
        console.log(this.state.loggedIn);
    }
      
    render() {
        return (
            <View style={styles.body}>
                <Image
                style={styles.logo}
                source={require('../../assets/images/translate.png')}
                resizeMode='contain' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 75
    },
    body: {
        backgroundColor: '#000839',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

export default SplashPage;