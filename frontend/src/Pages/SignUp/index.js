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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  onSignUp = () => {
    const { username, email, password } = this.state;

    // Perform your signup logic here
    if (username && email && password) {
      this.props.navigation.navigate('LandingPage');
      Alert.alert("Signed up successfully!");
    } else {
      // Failed signup
      Alert.alert("Please fill in all the fields.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/logo2.png")}
        />
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            keyboardType="email-address"
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
            onPress={this.onSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
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
    marginBottom: 10,
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
    textAlign: "center",
    lineHeight: 40, // Center text vertically within button
    color: "#fff",
  },
});

export default SignUp;