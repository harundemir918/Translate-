import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

class SplashPage extends Component {
    constructor(props) {
        super(props);
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
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('Main');
        }
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