import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";
import Tables from "./pages/Tables";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./index.css";

import { getToken } from "./utill/helpers";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import BlogDetails from "./pages/BlogDetails";
import ChangePassword from "./pages/ChangePass";


const PrivateRoutes = () => {
  let auth = getToken();
  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
};

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/blog/:id" element={<BlogDetails/>} /> {/* Dynamic Blog Post Route */}
        
        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<Main><Outlet /></Main>}>
            <Route path="/tables" element={<Tables />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
