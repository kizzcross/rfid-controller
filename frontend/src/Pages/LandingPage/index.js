import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useUser } from "../../UserContext";


const LandingPage = ({navigation}) => {
    const [nome, setNome] = useState("");
    const name = 'Dezin'

    const { currentUser, setCurrentUser } = useUser();
    function submitLogout(e) {
        e.preventDefault();
        // Remove o nome do usuário do armazenamento local
        localStorage.removeItem('token');
        // Atualiza o estado do usuário
        setCurrentUser(false);
        // Navega para a página de login
    }


    return (
        <View style={styles.footer}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>WELCOME!</Text>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Classes')}>
                    <View style={styles.areaButton}>
                        <Text style={styles.labelButton}>Management</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CreateStudent')}>
                    <View style={styles.areaButton}>
                        <Text style={styles.labelButton}>Create Student</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={(e) => submitLogout(e)}>
                    <View style={styles.areaButton}>
                        <Text style={styles.labelButton}>Logout</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.version}>
                    <Text>Versão 0.1</Text>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#DCDCDC',
    },
    container: {
        maxHeight: 1000,
        //marginBottom: 14,
        //marginTop: 18,
        //paddingEnd: 14,
        //paddingStart:14,
        backgroundColor: '#DCDCDC'

    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        paddingTop: 50,
        marginBottom: 50,
        fontFamily: 'sans-serif',

    },
    version: {
        marginEnd: 14,
        marginTop: 160,
        alignItems: 'flex-end',
        verticalAlign: 'bottom'
    },

    actionButton: {
        alignItems: "center",

    },
    areaButton: {
        margingTop: 100,
        backgroundColor: '#6A5ACD',
        height: 50,
        width: 140,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#D3D3D3'
    },


});

export default LandingPage;