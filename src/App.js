import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./MAIN/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
// import { UserAuthContextProvider } from "./components/CONTEXT/UserAuthContext";
import Quizinstructions from "./MAIN/Quiz/Quizinstructions";
import AdminAuth from "./components/AdminAuth";
import AdminDash from "./components/Admin/AdminDash";
import ProtectedRouteAdmin from "./components/Admin/ProtectedRouteAdmin";
import Quiz from "./MAIN/Quiz/Quiz";
import AdminDelete from "./components/Admin/AdminDelete";
import Scoreboard from "./MAIN/Quiz/Scoreboard";
function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        
            <Routes>
              <Route
                path="/home"
                element={
                  
                    <Home />
                 
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Quizinstructions" element={ <Quizinstructions />} />
              <Route path="/AdminAuth" element={<AdminAuth />} />
              <Route path="/Quiz" element={<Quiz/>}/>
              <Route path="/AdminDelete" element={<AdminDelete/>}/>
              <Route path="/Scoreboard" element={<Scoreboard/>}/>
            </Routes>
   
      <Col>
          <Routes>
          <Route
                path="/AdminDash"
                element={
                  // <ProtectedRouteAdmin Component = {AdminDash}/>
                 <AdminDash/>
                }
              />
               
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
