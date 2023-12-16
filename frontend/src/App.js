import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from "./Pages/LandingPage";
import Classes from "./Pages/Classes";
import { useUser } from './UserContext'; // Adjust the path as necessary
import Login from "./Pages/Login";
import Management from "./Pages/Management"
import CreateStudent from "./Pages/CreateStudent";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function App() {

    const { currentUser, setCurrentUser } = useUser();
    const [registrationToggle, setRegistrationToggle] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Stack = createNativeStackNavigator();


    useEffect(() => {
        // check if its in local storage
        if (localStorage.getItem('token')) {
            setCurrentUser(true);
        } else {
            setCurrentUser(false);
        }
    }, []);

    function update_form_btn() {
        if (registrationToggle) {
            document.getElementById("form_btn").innerHTML = "Register";
            setRegistrationToggle(false);
        } else {
            document.getElementById("form_btn").innerHTML = "Log in";
            setRegistrationToggle(true);
        }
    }

    function submitRegistration(e) {
        e.preventDefault();
        client.post(
            "api/user/",
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function (res) {
            client.post(
                "api/token/",
                {
                    email: email,
                    password: password
                }
            ).then(function (res) {
                localStorage.setItem('token', res.data.access);
            });
        });
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            setCurrentUser(true);
        }
        else{
            setCurrentUser(false);
        }
    }, [localStorage]);

    function submitLogin(e) {
        e.preventDefault();
        client.post(
            "/api/token/",
            {
                email: email,
                password: password
            }
        ).then(function (res) {
            localStorage.setItem('token', res.data.access);
            setCurrentUser(true);
        });
    }

    function submitLogout(e) {
        setCurrentUser(false);
        localStorage.removeItem('token');
    }

    if (currentUser) {
        return (
                <NavigationContainer >
                    <Stack.Navigator initialRouteName="LandingPage">
                        {/*the landing page must pass the logout function as props*/}
                        <Stack.Screen name="LandingPage" component={LandingPage}
                                      initialParams={{setCurrentUser: setCurrentUser}}/>
                        <Stack.Screen name="Classes" component={Classes}/>
                        <Stack.Screen name="CreateStudent" component={CreateStudent}/>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Management" component={Management}/>
                    </Stack.Navigator>
                </NavigationContainer>
        )
            ;
    } else {
        return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>Authentication App</Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    {
                        registrationToggle ? (
                            <div className="center">
                                <Form onSubmit={e => submitRegistration(e)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email}
                                                      onChange={e => setEmail(e.target.value)}/>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value={username}
                                                      onChange={e => setUsername(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={password}
                                                      onChange={e => setPassword(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        ) : (
                            <div className="center">
                                <Form onSubmit={e => submitLogin(e)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email}
                                                      onChange={e => setEmail(e.target.value)}/>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={password}
                                                      onChange={e => setPassword(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        )
                    }
                </div>
        );
    }
}

export default App;
