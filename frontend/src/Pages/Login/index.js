import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onLogin = () => {
    const { username, password } = this.state;

    // Perform your authentication logic here
    if (username === "dezin@afjp.com" && password === "a@1234") {
      // Successful login
      this.props.navigation.navigate('LandingPage');

      // Navigate to the next screen or perform actions upon successful login
    } else {
      // Failed login
      Alert.alert("Invalid credentials. Please try again.");
    }
  };

  onSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/logo2.png")}
        />
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.onLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onSignUp}
          >
            <Text style={styles.buttonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    alignItems:"center",
    textAlign:"center",
    paddingTop: 8,
    color: '#fff'
  },
});

export default Login;