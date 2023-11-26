import React, {useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navBar/navBar';
import SignIn from './components/signIn/signIn';
import Home from './components/Home/home';
import SignUp from './components/signUp/signUp';
import { auth } from './firebase';
import Medication from './components/medication/medication';
import VolunteerContactPage from './components/volunteer/volunteer';
import ContactDoctorPage from './components/doctor/doctor';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { mediactionActions } from './redux/reducer/medicationReducer';


function App() {
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
   
  auth.onAuthStateChanged((user)=>{
    if(user){
      setId(user.uid);
    }
  })

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "medication", String(id), "data"));
      const medicationData = [];
  
      querySnapshot.docs.forEach((doc) => {
        const one = doc.data();
        medicationData.push(one)
      });
  
      dispatch(mediactionActions.GET_DATA(medicationData));
    } catch (error) {
    }
  };
  
  if (isAuthenticated) {
    fetchData();
  }


 useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
    if(user){
      setName(user.displayName);
      setIsAuthenticated(true)
    }else{
      setName("");
      setIsAuthenticated(false)
    }
  })
 },[])


  const router = createBrowserRouter([
    {path: '/', element: <Navbar auth={[isAuthenticated, setIsAuthenticated]} />, children: [
      { index: true, element: <Home value={[name, isAuthenticated]} /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      {path:'/medication', element:<Medication/>},
      {path:'/volunteer', element:<VolunteerContactPage/>},
      {path:"/doctor", element:<ContactDoctorPage/>}
    ]
  }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
