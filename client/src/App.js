

import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}></Route>
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/policy' element={<Policy/>}></Route>
        <Route path='/*' element={<PageNotFound/>}></Route>
      </Routes>
      

    </>
  );
}

export default App;
