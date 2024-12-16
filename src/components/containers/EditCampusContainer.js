import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const campusId = this.props.match.params.id;
    this.props.fetchCampus(campusId);
  }

  handleSubmit = async (data) => {
    const updatedCampus = {
      ...data,
      id: this.props.campus.id,
    };

    await this.props.editCampus(updatedCampus);
    this.setState({ redirect: true });
  };

  render() {
    const { campus } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/campuses" />;
    }
    if (!campus) {
      return <div>Loading campus data...</div>;
    }
    console.log("Campus data props:", this.props.campus);

    return (
      <div>
        <Header />
        <EditCampusView campus={campus} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapState = (state) => ({
  campus: state.campus,
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  editCampus: (campus) => dispatch(editCampusThunk(campus)),
});

export default connect(mapState, mapDispatch)(EditCampusContainer);
