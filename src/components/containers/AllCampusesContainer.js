import Header from "./Header";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk, deleteCampusThunk } from "../../store/thunks";
import { AllCampusesView } from "../views";

// to: do add campus?
class AllCampusesContainer extends Component {
  // Get all campuses data from back-end database
  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <div>
        <Header />
        <AllCampusesView
          allCampuses={this.props.allCampuses}
          deleteCampus={this.props.deleteCampus}
        />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses, 
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
  };
};

AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(AllCampusesContainer);
