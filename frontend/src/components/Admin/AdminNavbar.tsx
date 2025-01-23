import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'
import Local from '../../environment/env'

const AdminNavbar:React.FC = () => {
    const navigate = useNavigate()

    const logout = async (): Promise<any> => {
        const token = localStorage.getItem('adminToken');
        console.log("dvv", localStorage.getItem)
        if (!token) {
            toast.error('No admin token found, please log in again.');
            return;
        }
    
        try {
            const response = await api.put(`${Local.ADMIN_LOGOUT}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}` // Adding "Bearer" prefix for token standard
                }
            });
    
            toast.success(`${response.data.message}`);
            localStorage.clear();
            navigate('/admin/login');
        } catch (err: any) {
            toast.error(`${err?.response?.data?.message || 'Logout failed. Please try again later.'}`);
        }
    }

  return (
    <nav className="navbar bg-secondary-subtle">
        <div className="container-fluid">
            <Link to="/admin/dashboard" className="navbar-brand italic ms-3">WavyBlogs</Link>
            <button className="btn btn-outline-dark me-3" type="button" onClick={ () => logout()}  >Logout</button>
        </div>
    </nav>
  )
}

export default AdminNavbar