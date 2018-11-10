import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Login from "../Login/Login";
import ImageCard from "../../components/ImageCard";
import "../Goals/Goals.css";

var userValue = {};
var passValue = {};


class HallofFame extends Component {
  state = {
    goals: [],
    habit: ""
  };

  componentDidMount() {
    userValue = this.props.location.userValue;
    passValue = this.props.location.passValue;
 //   alert("Welcome, " + userValue + "!");
 //   alert("Your password is " + passValue + "!");
    this.loadGoals();
  }

  loadGoals = () => {
    API.getGoals()
    .then(res =>
      {
      var goalSelection = res;
      var currentGoals = [];
      var statusToCompare = "achieve";

      for (var i=0; i<goalSelection.data.length; i++) {
        if (statusToCompare==goalSelection.data[i].habitStatus)
          {
            currentGoals.push(goalSelection.data[i]);
          }
      }      
      this.setState({ goals: currentGoals, habit: ""})
      }
    )
    .catch(err => console.log(err));
  };


/*  deleteGoal = id => {
    API.deleteGoal(id)
      .then(res => this.loadGoals())
      .catch(err => console.log(err));
  }; */

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
            <Link to={{
              pathname: "/goals/",
              userValue: userValue,
              passValue: passValue
            }}><h2>BACK TO MAIN</h2></Link>
        <Row>
          <Col size="md-12 sm-12">
          <ImageCard cardImageSource="https://i.imgur.com/rQjQC4t.jpg"/>

            {this.state.goals.length ? (
              <List>
              <table cellpadding="10">
                {this.state.goals.map(goal => (
                  <tr><ListItem key={goal._id}>
                      <td width="400px">
                       <b>User:</b> {goal.username}
                      </td>
                      <td width="400px">
                      <b>Habit: </b> {goal.habit}
                      </td>
                      <td width="400px">
                     <b>Day Streak: </b>  {goal.dayCounter}
                      </td>
                    <DeleteBtn onClick={() => this.deleteGoal(goal._id)} />
                  </ListItem></tr>
                ))}
              </table></List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HallofFame;
