import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./MAIN/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Quizinstructions from "./MAIN/Quiz/Quizinstructions";
import AdminAuth from "./components/AdminAuth";
import AdminDash from "./components/Admin/AdminDash";
import ProtectedRouteAdmin from "./components/Admin/ProtectedRouteAdmin";

function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
          
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Quizinstructions" element={ <ProtectedRoute><Quizinstructions /></ProtectedRoute>} />
              <Route path="/AdminAuth" element={<AdminAuth />} />
            
            </Routes>
          </UserAuthContextProvider>
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
