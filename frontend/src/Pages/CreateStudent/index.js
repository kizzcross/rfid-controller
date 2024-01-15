import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert, Button,
} from "react-native";
import firebase from "../../firebase";
import {useApi} from "../../ApiHook";
import {getDatabase, ref, set} from "firebase/database";

const CreateStudent = () => {
    const [student, setStudent] = useState({name: '', rfid: ''});
    const {GET, POST, PUT, DELETE} = useApi();
    const handleCreateStudent = async (student) => {
        console.log(student)
        await POST('student/', student).then((response) => {
            console.log(response);
            Alert.alert('Student created successfully!');
        });
    };
    // i need a listener to listen to the rfid reader
    useEffect(() => {
        const databaseRef = firebase.database().ref('/rfid/cardID');


        // Attach an event listener to the database reference
        databaseRef.on('value', async (snapshot) => {

            // Get the updated data from the snapshot
            const updatedData = await snapshot.val();
            if (updatedData!== ''){
            console.log(updatedData);
            // Update the state with the new data
            setStudent({...student, rfid: updatedData});
            set(databaseRef, '')}


            // Update the state with the new data

        });

        // Clean up the event listener when the component is unmounted
        return () => {
            databaseRef.off();
        };
    }, []);

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Enter student name"
                value={student.name}
                onChangeText={(text) => setStudent({...student, name: text})}/>
            <TextInput
                style={styles.input}
                placeholder="Enter student RFID"
                value={student.rfid}/>
            <Button title={'Create Student'} onPress={() => {
                handleCreateStudent(student);
            }}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    form: {
        width: "80%",
        alignSelf: "center",
        margin: 20,
    },
    label: {
        fontSize: 16,
        color: "#000",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        width: "100%",
        height: 40,
        backgroundColor: "#000080",
        marginTop: 20,
        color: "#fff",
        borderRadius: 5,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 8,
        color: '#fff'
    },
});

export default CreateStudent;