import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
  //Added New
  AddCampusContainer,
  EditCampusContainer,
  EditStudentContainer,
} from './components/containers';

// if you create separate components for adding/editing 
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        {/* Added New */}
        <Route exact path="/newcampus" component={AddCampusContainer} />
        <Route exact path="/campus/edit/:id" component={EditCampusContainer} />
        <Route exact path="/student/edit/:id" component={EditStudentContainer} />
      </Switch>        
    </div>
  );
}

export default App;
