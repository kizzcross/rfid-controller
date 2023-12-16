import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
} from 'react-native';
import {useApi} from "../../ApiHook";
import {Badge} from "react-bootstrap";
import firebase from "../../firebase";
import {getDatabase, ref, set} from "firebase/database";

const Management = ({navigation, route}) => {
    const {GET, POST, PUT, DELETE} = useApi();
    const [students, setStudents] = useState([]);

    const getStudentsFromClass = async () => {
        await GET(`students-in-classroom/${route.params.classId}`).then((response) => {
                setStudents(response);
            }
        );
    }
    const db = getDatabase();

    useEffect(() => {
        getStudentsFromClass();
        const databaseRef = firebase.database().ref('/rfid/cardID');


        // Attach an event listener to the database reference
        databaseRef.on('value', async (snapshot) => {
            // Get the updated data from the snapshot
            const updatedData = await snapshot.val();
            // Update the state with the new data
            updateInClassroom(updatedData);
            set(databaseRef, '')
        });

        // Clean up the event listener when the component is unmounted
        return () => {
            databaseRef.off();
        };
    }, []);

    const updateInClassroom = async (studentRFID) => {
        if (!studentRFID) return;
        console.log(studentRFID)
        await PUT(`update-student-classroom-status`, {
            studentRFID: studentRFID,
            classroom: route.params.classId
        }).then((response) => {
            getStudentsFromClass(route.params.classId)
            if (response) {
                Alert.alert('Student updated successfully!');
                let databaseRef = firebase.database().ref('/rfid/access');
                set(databaseRef, 'true')
            } else {
                Alert.alert('Student not found!');
                let databaseRef = firebase.database().ref('/rfid/access');
                set(databaseRef, 'false')
            }
        })
    }


    const renderUserItem = ({item}) => (
        <View style={styles.userItemContainer}>
            <View style={styles.userItem}>
                <Text>{item.student_name}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Management</Text>
            {/*<View style={styles.inputContainer}>*/}
            {/*    <TextInput*/}
            {/*        placeholder="Enter user name"*/}
            {/*        value={newUserName}*/}
            {/*        onChangeText={(text) => setNewUserName(text)}*/}
            {/*        style={styles.input}*/}
            {/*    />*/}
            {/*    <TextInput*/}
            {/*        placeholder="Enter user role"*/}
            {/*        value={newUserRole}*/}
            {/*        onChangeText={(text) => setNewUserRole(text)}*/}
            {/*        style={styles.input}*/}
            {/*    />*/}
            {/*    <Button title="Add User" onPress={addUser} color={'#32CD32'}/>*/}
            {/*</View>*/}
            {/*There must be a check button that shows if the student is in the classroom*/}
            {!students.length ? (
                <Text style={{textAlign: 'center'}}>No students found.</Text>
            ) : (
                students.map((student) => (
                    <>
                        {/*padding */}
                        <div style={{padding:6}}>
                            <View style={styles.userList}>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text>{student.student_name}</Text>
                                    {/*    if the student is in classroom a green badge else a red*/}
                                    {student.is_in_classroom ? (
                                        <Badge bg="success">In classroom</Badge>
                                    ) : (
                                        <Badge bg="danger">Not in classroom</Badge>
                                    )}
                                </div>
                            </View>
                        </div>
                    </>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginVertical: 5,
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    userItemContainer: {
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    userList: {
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
});

export default Management;
