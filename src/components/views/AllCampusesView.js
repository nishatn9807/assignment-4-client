/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  if (!props.allCampuses.length) {
    return (
      <div>
        <div>There are no campuses. Add THEM</div>
        <Link to={`/newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }


  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <img
            className="campusImage"
            src={
              campus.imageUrl ||
              "https://cdn.prod.website-files.com/63dd388b87532047a1725f8f/6734e5a0cc1c56b124d6ecc3_campus-shot.jpg.webp"
            }
            alt="Campus"
          />
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <button onClick={() => props.deleteCampus(campus.id)}>
            Delete Campus
          </button>
          <hr />
        </div>
      ))}
      <br />
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br />
      <br />
    </div>
  );
};
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
