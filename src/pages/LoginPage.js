import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FormRow from '../components/FormRow';

import firebase from "firebase";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            mail: '',
            password: '',
            isLoading: false,
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyDpBA1Z2fT2d97SEw7c94B0N-6FoceajHU",
            authDomain: "series-7022e.firebaseapp.com",
            databaseURL: "https://series-7022e.firebaseio.com",
            projectId: "series-7022e",
            storageBucket: "series-7022e.appspot.com",
            messagingSenderId: "342677134274",
            appId: "1:342677134274:web:b700133d6ac262507bd45b",
            measurementId: "G-Z47J444QYQ"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);


    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        })

    }

    tryLogin() {
        this.setState({ isLoading: true });
        const { mail, password } = this.state
        firebase.auth()
            .signInWithEmailAndPassword(mail, password)
            .then(user => {
                console.log('usuário autenticado', user);
            })
            .catch(error => {
                console.log('usuário não autenticado', error)
            })
            .then(() => this.setState({ isLoading: false }));
        ;
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }
        return (
            <Button title="Entrar" onPress={() => { this.tryLogin() }} />

        )
    }


    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
                {this.renderButton()}




            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10

    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,


    },

})