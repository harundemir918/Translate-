import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const CustomButtonLarge = ({title, width, height, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            height={height}
            onPress={onPress}>
            <Text
                style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '85%',
        height: 50,
        backgroundColor: '#FFA41B',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    text: {
        color: 'white'
    }
})

export {CustomButtonLarge}