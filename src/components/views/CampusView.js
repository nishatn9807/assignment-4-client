import { Link } from "react-router-dom";

const CampusView = (props) => {
  const { campus, handleDeleteCampus, handleDeleteStudent } = props;
  return (
    <div>
      <img
        className="campusImage"
        src={
          campus.imageURL ||
          "https://zeta.creativecirclecdn.com/chief/original/20241008-134634-eaa-phpmf60Dp.jpg"
        }
        alt="Campus"
      />
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.length > 0 ? (
        campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => handleDeleteStudent(student)}>
                Delete Student
              </button>
            </div>
          );
        })
      ) : (
        <h5> No students Enrolled</h5>
      )}
      <Link to={`/campus/edit/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <button onClick={() => handleDeleteCampus(campus.id)}>
        Delete Campus
      </button>
    </div>
  );
};

export default CampusView;
