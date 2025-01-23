import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminOutlet:React.FC = () => {
  const navigate = useNavigate();
  const adminToken:any = localStorage.getItem('adminToken')||false;

  useEffect(()=>{
    if (!adminToken) {
      navigate('/admin/login');
    }
  },[]);
  
  return (
    <>
        <Outlet />
    </>
  )
}

export default AdminOutlet