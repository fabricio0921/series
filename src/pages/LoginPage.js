import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
    render() {
        return (
            <View >
                <FormRow>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                    />
                </FormRow>
                <FormRow>
                    <TextInput placeholder="Senha"
                        secureTextEntry
                    />
                </FormRow>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,


    }
})