import React, {useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styling/sidebar.css';

const Sidebar1:React.FC = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem('tokens') && !(localStorage.getItem('isAdmin'))) {
      navigate('/app/dashboard');
    }
  },[]);

  return (
    <>
    <div className='row w-100'>
      <img src='/src/assets/images/common_side.webp' className='sideimg col'  alt="Side Image 1" />

      <div className='col m-0' >
        <Outlet />
      </div>
    </div>
    <div className='row' style={{width:'100.9%'}}>
      <p className='border border-1 border-dark text-center text-secondary py-2 mb-0' > &copy; 2023 DR. Palig. All rights reserved. </p>
    </div>
    </>
  )
}

export default Sidebar1