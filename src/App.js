import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";

import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import "./App.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    stride_abbr: [],
    model_offender: [],
    model_treats: [],
    defense: [],
    as: [],
    tab: 0,
    index: 0,
    activeModel: false,
    activeStride: false
  };

  handleChange = (event, newValue) => {
    this.setState({ tab: newValue, activeModel: false, activeStride: false });
  };

  handleChangeIndex = index => {
    this.setState({ tab: index });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {})
      .catch(error => {
        this.setState({ error: error });
      });
  };
  componentDidMount() {
    const db = firebaseApp.firestore();
    db.collection("stride_abbr")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ stride_abbr: data });
      });
    db.collection("model_offender")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ model_offender: data });
      });
    db.collection("model_treats")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ model_treats: data });
      });
    db.collection("defense")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ defense: data });
      });
    db.collection("as")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ as: data });
      });
  }
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    const {
      stride_abbr,
      tab,
      model_offender,
      model_treats,
      defense,
      as: auto_s
    } = this.state;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {user ? (
                <p>
                  Привіт, {user.displayName ? user.displayName : user.email}
                </p>
              ) : (
                <p>Будь ласка залогіньтесь!</p>
              )}
            </Typography>
            {user ? (
              <Button variant="contained" color="primary" onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <header className="App-header">
          {user ? (
            <div className="user">
              <Tabs
                value={tab}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Автоматизовані Системи" />
                <Tab label="STRIDE" />
                <Tab label="Модель Порушників" />
                <Tab label="Модель Загроз" />
                <Tab label="Технології захисту" />
              </Tabs>
              <SwipeableViews
                index={tab}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabPanel value={tab} index={0}>
                  <Paper>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        {auto_s
                          .filter((el, i) => i === 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.function}>
                                <TableCell component="th" scope="row">
                                  {row.as}
                                </TableCell>
                                <TableCell align="center">
                                  {row.function}
                                </TableCell>
                                <TableCell align="center">
                                  {row.structure}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableHead>
                      <TableBody>
                        {auto_s
                          .filter((el, i) => i !== 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.function + i}>
                                <TableCell component="th" scope="row">
                                  {row.as}
                                </TableCell>
                                <TableCell align="center">
                                  {row.function}
                                </TableCell>
                                <TableCell align="center">
                                  <img src={row.structure} alt="structure" />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Paper>
                </TabPanel>

                <TabPanel value={tab} index={1}>
                  <Paper>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        {stride_abbr
                          .filter((el, i) => i === 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.desc}>
                                <TableCell component="th" scope="row">
                                  {row.letter}
                                </TableCell>
                                <TableCell align="center">{row.abbr}</TableCell>
                                <TableCell align="center">{row.desc}</TableCell>
                                <TableCell align="center">
                                  {row.random}
                                </TableCell>
                                <TableCell align="center">
                                  {row.malicious}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableHead>
                      <TableBody>
                        {stride_abbr
                          .filter((el, i) => i !== 0)
                          .map((row, i) => {
                            return (
                              <TableRow
                                key={row.desc}
                                style={{
                                  background: row.letter.includes(
                                    this.state.activeStride
                                  )
                                    ? "#dc7575"
                                    : "initial"
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.letter}
                                </TableCell>
                                <TableCell align="center">{row.abbr}</TableCell>
                                <TableCell align="center">{row.desc}</TableCell>
                                <TableCell align="center">
                                  {row.random}
                                </TableCell>
                                <TableCell align="center">
                                  {row.malicious}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Paper>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <Paper>
                    <Table size="small" aria-label="a dense table">
                      <TableBody>
                        {model_offender.map((row, i) => {
                          return (
                            <TableRow
                              key={row.desc}
                              style={{
                                background: row.name.includes(
                                  this.state.activeModel
                                )
                                  ? "#dc7575"
                                  : "initial"
                              }}
                            >
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">{row.desc}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                </TabPanel>
                <TabPanel value={tab} index={3}>
                  <Paper>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        {model_treats
                          .filter((el, i) => i === 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.descAS}>
                                <TableCell component="th" scope="row">
                                  {row.life}
                                </TableCell>
                                <TableCell align="center">
                                  {row.atsyst}
                                </TableCell>
                                <TableCell align="center">
                                  {row.descAS}
                                </TableCell>
                                <TableCell align="center">
                                  {row.offender}
                                </TableCell>
                                <TableCell align="center">
                                  <div className="wrapper-check">
                                    {row.threats.map(letter => (
                                      <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          this.setState({
                                            tab: 0,
                                            index: 0,
                                            activeStride: letter
                                          });
                                        }}
                                        key={`${Math.random()}`}
                                        className="letter-header"
                                      >
                                        {letter}
                                      </span>
                                    ))}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableHead>
                      <TableBody>
                        {model_treats
                          .filter((el, i) => i !== 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.descAS}>
                                <TableCell component="th" scope="row">
                                  {row.life}
                                </TableCell>
                                <TableCell align="center">
                                  {row.atsyst}
                                </TableCell>
                                <TableCell align="center">
                                  {row.descAS}
                                </TableCell>
                                <TableCell
                                  style={{ cursor: "pointer" }}
                                  align="center"
                                  onClick={() => {
                                    this.setState({
                                      tab: 1,
                                      index: 1,
                                      activeModel: row.offender
                                    });
                                  }}
                                >
                                  {row.offender}
                                </TableCell>
                                <TableCell align="center">
                                  <div className="wrapper-check">
                                    {row.threats.map((letter, i) => (
                                      <span
                                        key={`${Math.random()}`}
                                        className="letter-cell"
                                      >
                                        {letter ? <CheckIcon /> : <CloseIcon />}
                                      </span>
                                    ))}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Paper>
                </TabPanel>
                <TabPanel value={tab} index={4}>
                  <Paper>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        {defense
                          .filter((el, i) => i === 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.way}>
                                <TableCell component="th" scope="row">
                                  {row.let}
                                </TableCell>
                                <TableCell align="center">
                                  {row.threat}
                                </TableCell>
                                <TableCell align="center">
                                  {row.method}
                                </TableCell>
                                <TableCell align="center">{row.way}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableHead>
                      <TableBody>
                        {defense
                          .filter((el, i) => i !== 0)
                          .map((row, i) => {
                            return (
                              <TableRow key={row.way}>
                                <TableCell
                                  style={{ cursor: "pointer" }}
                                  component="th"
                                  scope="row"
                                  onClick={() => {
                                    this.setState({
                                      tab: 0,
                                      index: 0,
                                      activeStride: row.let
                                    });
                                  }}
                                >
                                  {row.let}
                                </TableCell>
                                <TableCell align="center">
                                  {row.threat}
                                </TableCell>
                                <TableCell align="center">
                                  {row.method}
                                </TableCell>
                                <TableCell align="center">{row.way}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Paper>
                </TabPanel>
              </SwipeableViews>
            </div>
          ) : (
            <div className="no-user">
              <h1>Комплексна Лабораторна робота:</h1>
              <h1>Методологія STRIDE</h1>
              {this.state.error && <p>{this.state.error.message}</p>}
              <br />
              <form onSubmit={this.handleSubmit}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  children="Log In"
                />
              </form>
            </div>
          )}
        </header>
      </div>
    );
  }
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
