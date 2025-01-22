import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminOutlet:React.FC = () => {
    
  return (
    <>
        <Outlet />
    </>
  )
}

export default AdminOutlet