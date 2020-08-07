import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)
            this.state={

            mail:'',
            password:''
        }
    }

    onChangeHandler(field, value){
        this.setState({
            [field]:value
        })

    }


    render() {
        return (
            <View >
                <FormRow>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={this.state.mail}
                        onChangeText={value =>this.onChangeHandler('mail',value)}
                    />
                </FormRow>
                <FormRow>
                    <TextInput 
                    placeholder="Senha"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={value => this.onChangeHandler('password',value)}
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