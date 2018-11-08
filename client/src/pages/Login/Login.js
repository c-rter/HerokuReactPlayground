import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: "",
      user: "", // for entry
      pwd: "", // for entry
      habit: "", // for entry
      signupUser: "",
      signupPwd1: "",
      signupPwd2: "",
      signupHabit: ""
    };
  }

  // Load database
  componentDidMount() {
    this.loadGoals();
  }
  // fn to load database
  loadGoals = () => {
    API.getGoals()
      .then(res => {
        this.state.goals = res.data;
        console.log(this.state.goals);
      })

      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.user && this.state.pwd) {
      console.log("Form Submit");
      for (var i = 0; i < this.state.goals.length; i++) {
        if (
          (this.state.user === this.state.goals[i].username) &
          (this.state.pwd === this.state.goals[i].password)
        ) {
          console.log("Awesome!");
          //window.location.href = "/goals";
          this.setState({ redirect: true });
        } else {
          console.log("HFS broken");
        }
      }
    }
  };

  // Invalid SIgnup

  // Sign Up Btn - Toggle Sign up form view
  handleSignUpToggle = event => {
    console.log("Toggle View");
  };
  // Sign Up Process
  handleSignUpSubmit = event => {
    event.preventDefault();
    if (this.state.signupPwd1 === this.state.signupPwd2) {
      // compare all users stored in
      for (var i = 0; i < this.state.goals.length; i++) {
        if (this.state.signupUser === this.state.goals[i].username) {
          alert("Exit fn, User already exists. Please Login");
          return false;
        } else if (i == this.state.goals.length - 1) {
          alert("Save and Sign Up");
          this.state.user = this.state.signupUser;
          this.state.pwd = this.state.signupPwd1;
          this.state.habit = this.state.signupHabit;

          API.saveGoal({
            username: this.state.signupUser,
            password: this.state.signupPwd1,
            habit: this.state.signupHabit,
            dayCounter: 0,
            dailyStatus: 0,
            habitStatus: "active"
          });
          this.setState({ redirect: true });
        }
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/goals/",
            userValue: this.state.user,
            passValue: this.state.pwd
          }}
        />
      );
    }

    return (
      <Container fluid>
        <Input
          value={this.state.user} //this.state.username
          onChange={this.handleInputChange}
          name="user"
          placeholder="username (required)"
        />
        <Input
          value={this.state.pwd} //this.state.username
          onChange={this.handleInputChange}
          name="pwd"
          placeholder="password (required)"
        />
        <form>
          <FormBtn
            disabled={!(this.state.user && this.state.pwd)}
            onClick={this.handleFormSubmit}
          >
            Login
          </FormBtn>
        </form>

        <form>
          <FormBtn onClick={this.handleSignUpToggle}>SignUp</FormBtn>
        </form>
        <Input
          value={this.state.signupUser} //this.state.username
          onChange={this.handleInputChange}
          name="signupUser"
          placeholder="Choose a username (required)"
        />
        <Input
          value={this.state.signupPwd1} //this.state.username
          onChange={this.handleInputChange}
          name="signupPwd1"
          placeholder="Choose a password (required)"
        />
        <Input
          value={this.state.signupPwd2} //this.state.username
          onChange={this.handleInputChange}
          name="signupPwd2"
          placeholder="Confirm password (required)"
        />
        <Input
          value={this.state.signupHabit} //this.state.username
          onChange={this.handleInputChange}
          name="signupHabit"
          placeholder="Input a Habit to follow or break"
        />
        <form>
          <FormBtn
            disabled={
              !(
                this.state.signupUser &&
                this.state.signupPwd2 &&
                this.state.signupPwd2
              )
            }
            onClick={this.handleSignUpSubmit}
          >
            Complete
          </FormBtn>
        </form>
      </Container>
    );
  }
}

export default Login;
