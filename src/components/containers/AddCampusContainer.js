/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AddCampusView from "../views/AddCampusView";

import { addCampusThunk } from "../../store/thunks";
class AddCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectId: null,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    console.log(event);
    let res = await this.props.addCampus(event);
    console.log(res, "res");
    this.setState({
      redirect: true,
      redirectId: res.id,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <AddCampusView handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (id) => dispatch(addCampusThunk(id)),
  };
};

export default connect(null, mapDispatch)(AddCampusContainer);
