import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Agents from "./pages/Agents";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";

// ✨ FIXED: Added the missing import for your details component page!
import PropertyDetails from "./pages/PropertyDetails"; 

function App() {
  return (
    <Router>
      {/* Wrap everything in a full-height flex column wrapper */}
      <div className="d-flex flex-column min-vh-100">
        
        {/* Navigation Header sits at the top */}
        <Navbar />

        {/* Main Content Area stretches automatically to push the footer down */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            
            {/* ✨ Perfectly aligned to your dynamic :id URL pattern */}
            <Route path="/properties/:id" element={<PropertyDetails />} />
            
            <Route path="/agents" element={<Agents />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-property" element={<AddProperty />} />
          </Routes>
        </main>

        {/* Footer sits solidly at the absolute bottom of every page */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;