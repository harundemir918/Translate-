import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const CustomInput = ({placeholder, onChangeText, width, height, multiline}) => {
    return (
        <TextInput
            style={styles.input}
            width={width}
            height={height}
            multiline={multiline}
            placeholder={placeholder}
            placeholderTextColor={"#C97900"}
            onChangeText={onChangeText} />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        borderRadius: 10,
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 20,
        borderColor: '#FFA41B',
        color: '#FFA41B',
        alignSelf: 'center',
        marginTop: 20,
        textAlignVertical: 'top'
    }
})

export {CustomInput}