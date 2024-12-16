import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";
import EditStudentView from "../views/EditStudentView";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    this.props.fetchStudent(studentId);
  }

  handleSubmit = async (data) => {
    const updatedStudent = {
      ...data,
      id: this.props.student.id,
    };
    await this.props.editStudent(updatedStudent);
    this.setState({ redirect: true });
  };

  render() {
    const { student } = this.props;

    if (this.state.redirect) {
      return <Redirect to={`/student/${student.id}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView student={student} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapState = (state) => ({
  student: state.student,
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student)),
});

export default connect(mapState, mapDispatch)(EditStudentContainer);
