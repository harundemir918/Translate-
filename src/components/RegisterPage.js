import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomInput} from './common/'

class RegisterPage extends Component {
    render() {
        return (
            <View>
                <CustomInput 
                    placeholder={'Email'}
                    width={300}
                    height={100}
                />
                <CustomInput 
                    placeholder={'Şifre'}
                    width={300}
                    height={100}
                />
                <CustomButton
                    title={'Giriş Yap'}
                />
                <Text>Hesabınız yok mu? Kayıt olun.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default RegisterPage;