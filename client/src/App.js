import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import AdminRegister from './pages/Admin/admin';
import AdminDashboard from './pages/Admin/AdminDashboard';

// 🔹 Protected Route for Users
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

// 🔹 Protected Route for Admins
const AdminProtectedRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes (Protected) */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/booking/:carid" element={<ProtectedRoute><BookingCar /></ProtectedRoute>} />
        <Route path="/userbookings" element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
        <Route path="/addcar" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
        <Route path="/editcar/:carid" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/admin/register" element={<AdminProtectedRoute><AdminRegister /></AdminProtectedRoute>} />

        {/* Not Found Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
