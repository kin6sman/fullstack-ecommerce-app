

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
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}></Route>
            <Route path='user/orders' element={<Orders/>}></Route>
            <Route path='user/profile' element={<Profile/>}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}></Route>
            <Route path='admin/create-category' element={<CreateCategory/>}></Route>
            <Route path='admin/create-product' element={<CreateProduct/>}></Route>
            <Route path='admin/users' element={<Users/>}></Route>
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
