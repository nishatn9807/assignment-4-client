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

import NewStudentView from "../views/NewStudentView";
import { addStudentThunk } from "../../store/thunks";

class NewStudentContainer extends Component {
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

  handleSubmit = async (event) => {
    let newStudent = await this.props.addStudent(event);
    this.setState({
      redirect: true,
      redirectId: newStudent.id,
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <NewStudentView handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),
  };
};

export default connect(null, mapDispatch)(NewStudentContainer);
