import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const PickerButton = ({title, width, height, onPress}) => {
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
        width: '26%',
        height: 50,
        backgroundColor: '#FFA41B',
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
})

export {PickerButton}