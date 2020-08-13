import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FormRow from '../components/FormRow';

import firebase, { auth } from "firebase";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            mail: '',
            password: '',
            isLoading: false,
            message: ''
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
        this.setState({ isLoading: true, message: '' });
        const { mail, password } = this.state
        firebase.auth()
            .signInWithEmailAndPassword(mail, password)
            .then(user => {
                this.setState({ message: 'Sucesso!' });
                // console.log('usuário autenticado', user);
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas',
                        [{
                            text: 'Não',
                            onPress: () => console.log('usuário não quer criar nada'),
                            style: 'cancel' //ios
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(mail, password)
                                    .then(user => {
                                        this.setState({ message: 'Sucesso !' });
                                    })
                                    .catch(error => this.setState({
                                        message: this.getMessageByErrorCode(error.code)
                                    }))
                            }
                        }],
                        { cancelable: false }
                    )
                }
                this.setState({ message: this.getMessageByErrorCode(error.code) })

                // console.log('usuário não autenticado', error)
            })
            .then(() => this.setState({ isLoading: false }));
        ;
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'senha incorreta !';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';


            default:
                return 'Erro desconhecido';
        }

    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }
        return (
            <Button title="Entrar" onPress={() => { this.tryLogin() }} />

        )
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;

        return (
            <View>
                <Text>{message}</Text>
            </View>
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
                {this.renderMessage()}




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