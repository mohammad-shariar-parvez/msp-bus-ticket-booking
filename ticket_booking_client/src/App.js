
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/loaders/Loader';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import PublicRoute from './components/publicRoutes/PublicRoute';
import AdminHome from './pages/Admin/AdminHome';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './resources/global.css';
import BookNow from './pages/BookNow';
import Bookings from './pages/Bookings';
import './resources/global.css';


const App = () => {
  const { loading } = useSelector(state => state.alerts);
  console.log("I AM RHE APP KING", loading);

  return (
    <div className='main-bg' >
      {loading && <Loader />}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/book-now/:id' element={<ProtectedRoute><BookNow /></ProtectedRoute>} />
          <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path='/admin/buses' element={<ProtectedRoute><AdminBuses /></ProtectedRoute>} />
          <Route path='/admin/users' element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
