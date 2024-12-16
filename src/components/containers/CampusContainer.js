/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStudentThunk,
  deleteCampusThunk,
  deleteStudentThunk,
  fetchCampusThunk,
} from "../../store/thunks";

import { CampusView } from "../views";
import { Redirect } from "react-router-dom";

// see details
// go to single student?
//add new / existing to campus
// delete student
//nagivate to edit student
//delete
class CampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
  }

  handleDeleteStudent = async (student) => {
    console.log(student);
    const updatedStudent = { ...student, campusId: null };
    console.log(updatedStudent);
    await this.props.deleteStudent(student.id); 
    console.log(updatedStudent, "updatedStudent");
    await this.props.addStudent(updatedStudent); 
    this.props.fetchCampus(this.props.match.params.id); 
  };

  handleDeleteCampus = async (id) => {
    await this.props.deleteCampus(id);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/campuses" />;
    }

    const { campus } = this.props;

    return (
      <div>
        <Header />
        <CampusView
          campus={campus}
          students={campus.students || []}
          handleDeleteCampus={() => this.handleDeleteCampus(campus.id)}
          handleDeleteStudent={this.handleDeleteStudent}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus, 
    state: state.allStudents,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)), // fix?
    deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
    addStudent: (student) => dispatch(addStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(CampusContainer);
