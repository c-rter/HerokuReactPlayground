import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Login from "../Login/Login";
import CounterBtn from "../../components/CounterBtn";
import ImageCard from "../../components/ImageCard";
import "./Goals.css";

var d3 = require("d3");
const dayOfYear = require("day-of-year");

var userValue = {};
var passValue = {};
var currentDay = dayOfYear();
var startDate = 0;
var counterDay = 0;
var currentDayDisplay = 0;
var statusChanger = { dayCounter: counterDay, rollingDay: currentDay };
var habitStatusChanger = { habitStatus: "fail" };
var habitStatusChangerSuccess = { habitStatus: "achieve" };
var d3counter = 0;
var tdcounter = 0;

//{_id: new ObjectId(stringId)

class Goals extends Component {
  state = {
    goals: [],
    habit: ""
  };

  componentDidMount() {
    //  this.examplePutFunction(stringID, testChanger);
    //  alert("Welcome, " + userValue + "!");
    //  alert("Your password is " + passValue + "!");
    userValue = this.props.location.userValue;
    passValue = this.props.location.passValue;
    this.loadGoals();
  }

  loadGoals = () => {
    API.getGoals()
      .then(res => {
        var goalSelection = res;
        var currentGoals = [];
        var nameToCompare = userValue;
        d3counter = 0;
        tdcounter = 0;

        for (var i = 0; i < goalSelection.data.length; i++) {
          if (nameToCompare == goalSelection.data[i].username) {
            if (goalSelection.data[i].habitStatus == "active") {
              if (goalSelection.data[i].dayCounter == 21) {
                this.statusSuccess(goalSelection.data[i]._id, habitStatusChangerSuccess);
              }
              else if ((currentDay - goalSelection.data[i].rollingDay) == 0) {
                tdcounter += goalSelection.data[i].dayCounter;
                d3counter += (goalSelection.data[i].dayCounter * 5);
                currentGoals.push(goalSelection.data[i]);
              }
              else if ((currentDay - goalSelection.data[i].rollingDay) == 1) {
                tdcounter += goalSelection.data[i].dayCounter;
                d3counter += (goalSelection.data[i].dayCounter * 5);
                currentGoals.push(goalSelection.data[i]);
              }
              else {
                this.statusFailure(goalSelection.data[i]._id, habitStatusChanger)
              }
            }
          }
        }
        this.setState({ goals: currentGoals, habit: "" })
        document.getElementById("idforD3").innerHTML = "";
        this.myD3(d3counter);
      }
      )
      .catch(err => console.log(err));
  };

  changeTheStatus = (id, changingObject) => {

    API.getGoal(id)
      .then(res => {
        startDate = res.data.startDay;
        currentDayDisplay = currentDay - startDate;
        statusChanger = { dayCounter: currentDayDisplay, rollingDay: currentDay };
        API.updateGoal(id, statusChanger)
          .then()
          .catch(err => console.log(err));
        this.loadGoals();
      }).catch(err => console.log(err));
  };

  statusFailure = (id, changingObject) => {
    API.updateGoal(id, changingObject)
      .then()
      .catch(err => console.log(err));
  };

  statusSuccess = (id, changingObject) => {
    API.updateGoal(id, changingObject)
      .then()
      .catch(err => console.log(err));
  };

  deleteGoal = id => {
    API.deleteGoal(id)
      .then(res => this.loadGoals())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  myD3 = (widthValue) => {
    var sampleSVG = d3.select("#idforD3")
      .append("svg")
      .attr("width", 500)
      .attr("height", 25);

    sampleSVG.append("rect")
      .style("stroke", "aliceblue")
      .style("fill", "#476699")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", widthValue)
      .attr("height", 25)
      .on("mouseover", function () { d3.select(this).style("fill", "black"); })
      .on("mouseout", function () { d3.select(this).style("fill", "#476699"); });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (true) {
      API.saveGoal({
        username: userValue,
        password: passValue,
        habit: this.state.habit,
        dayCounter: 0,
        startDay: currentDay,
        habitStatus: "active",
        rollingDay: currentDay
      })
        .then(res => this.loadGoals())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <br />



        <Row>
          <Col size="md-4 lg-4 sm-4 xl-4">
            <Link to={{
              pathname: "/halloffame/",
              userValue: userValue,
              passValue: passValue
            }}><h2>HALL OF FAME</h2></Link></Col>
          <Col size="md-4 lg-4 sm-4 xl-4">
            <Link to={{
              pathname: "/hallofshame/",
              userValue: userValue,
              passValue: passValue
            }}><h2>HALL OF SHAME</h2></Link></Col>
                      <Col size="md-4 lg-4 sm-4 xl-4">
            <Link to={"/"}><h2>LOG OUT</h2></Link></Col>
          <Col size="md-1 lg-1 sm-1 xl-1" />
          <Col size="md-10 lg-10 sm-10 xl-10">
            <ImageCard cardImageSource="https://i.imgur.com/aX3MAlg.jpg" /></Col>
          <Col size="md-1 lg-1 sm-1 xl-1" />
          <Col size="md-6">
            <Jumbotron>
              <h1>Enter Habit to Make or Break</h1>
            </Jumbotron>
            <br />
            <form>
              <Input
                value={this.state.habit}
                onChange={this.handleInputChange}
                name="habit"
                placeholder="ENTER A NEW HABIT"
              />
              <FormBtn onClick={this.handleFormSubmit}> Submit Habit </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Current Habits</h1>
            </Jumbotron>
            <br />
            <div>
              Total Days Over All Current Habits: {tdcounter}
            </div>
            <span id="idforD3"></span> <br /><br />
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
                      <CounterBtn onClick={() => this.changeTheStatus(goal._id, statusChanger)} />
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

export default Goals;

