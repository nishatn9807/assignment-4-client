/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";
import { Redirect } from "react-router-dom";
import { deleteStudentThunk } from "../../store/thunks";

class StudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  handleDelete = async (studentId) => {
    await this.props.deleteStudent(studentId); 
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/students" />;
    }

    return (
      <div>
        <Header />
        <StudentView
          student={this.props.student}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student, 
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
  };
};


export default connect(mapState, mapDispatch)(StudentContainer);
