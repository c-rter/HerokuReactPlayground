import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Login extends Component {

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({

      })
        .then(res => this.doTheThing())
        .catch(err => console.log(err));
    }
  };

  doTheThing() {

    
  }

  render() {
    return (
      <Container fluid>




            <Link to={"/books/"}>
          LOGIN
               </Link>
      </Container>
    );
  }
}

export default Login;
