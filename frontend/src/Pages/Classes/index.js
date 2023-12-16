import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Header from "../../components/Header";
import {useApi} from "../../ApiHook";

const Classes = ({navigation, route}) => {
    const [classes, setClasses] = useState([
        {id: 1, name: "Class A"},
        // Add more classes as needed
    ]);
    const {GET, POST, PUT, DELETE} = useApi();

    useEffect(() => {
        FetchClasses();
    }, []);

    const FetchClasses = async () => {
        await GET("classroom").then((response) => {
            setClasses(response);
        }
        );
    }


    const handleClassSelection = (classId) => {
        // Perform actions upon selecting a class
        // For now, just navigate to a different screen passing the class name
        navigation.navigate('Management', {classId: classId});
    };

    return (
        <View style={styles.footer}>
            <Header/>
            <Text style={styles.title}>Turmas:</Text>
            {classes.map((classItem) => (
                <TouchableOpacity
                    key={classItem.id}
                    style={styles.actionButton}
                    onPress={() => handleClassSelection(classItem.id)}
                >
                    <View style={styles.areaButton}>
                        <Text style={styles.labelButton}>{classItem.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={styles.version}>
                <Text>Versão 0.1</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#DCDCDC",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 50,
        marginBottom: 50,
    },
    version: {
        marginEnd: 14,
        marginTop: 160,
        alignItems: "flex-end",
        verticalAlign: "bottom",
    },
    actionButton: {
        alignItems: "center",
    },
    areaButton: {
        backgroundColor: "#6A5ACD",
        height: 50,
        width: 140,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    labelButton: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "#D3D3D3",
    },
});

export default Classes;
