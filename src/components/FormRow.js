import React from 'react';
import { View, Text, TextInput, StyleSheet, } from 'react-native';
import { render } from 'react-dom';




const FormRow = props => {
    const { children, first, last } = props

    return (
        <View style={styles.container}>
            {children}

        </View>
    )

};

export default FormRow;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1
    },
    first: {
        marginTop: 10
    },
    last: {
        marginTop: 10
    }

})