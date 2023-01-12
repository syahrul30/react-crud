import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DiscoveryPage from './Pages/DiscoveryPage';
import Login from './Pages/Login';
import NewCarPage from './Pages/NewCarPage';
import Register from './Pages/Register';
import ProtectedRoute from './hoc/ProtectedRoute';
import ProtectedRouters from './hoc/ProtectedRouters';
import EditCar from './Pages/EditCar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='/discovery' element={<DiscoveryPage />}/>
        <Route path='/new-car' element={<NewCarPage />}/>
        <Route path='/edit/:id' element={<EditCar />}/>
      </Route>

      {/* <Route 
        path='/discovery'
        element={
          <ProtectedRouters>
              <DiscoveryPage/>
          </ProtectedRouters>
        }
      ></Route> */}
    </Routes>
  );
}

export default App;

