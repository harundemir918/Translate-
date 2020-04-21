import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const CustomButton = ({title, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.button}
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
        width: 125,
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

export {CustomButton}