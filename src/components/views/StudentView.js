/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
const StudentView = ({ student, handleDelete }) => {
  return (
    <div>
      <img
        className="studentImage"
        src={
          student.Image ||
          "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        }
        alt="Campus"
      />
      <h1>{`${student.firstname} ${student.lastname}`}</h1>
      <h3>GPA: {student.gpa}</h3>
      <h3>Email: {student.email}</h3>
      {student.campus ? (
        <div>
          <h3>Campus:</h3>
          <Link to={`/campus/${student.campus.id}`}>
            <p>{student.campus.name}</p>
          </Link>
        </div>
      ) : (
        <p>Campus: No Campus || Student is not Enrolled</p>
      )}

      <Link to={`/student/edit/${student.id}`}>
        <button>Edit Student</button>
      </Link>

      <button onClick={() => handleDelete(student.id)}>Delete Student</button>
    </div>
  );
};

export default StudentView;
