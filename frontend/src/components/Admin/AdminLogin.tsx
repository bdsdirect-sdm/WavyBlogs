import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import Local from '../../environment/env';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Yup Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const AdminLogin:React.FC = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

  useEffect(()=>{
    if (adminToken) {
      navigate('/admin/dashboard');
    }
  },[]);

 
  console.log(adminToken);
  const authUser = async(data:any) => {
    try{
      const response = await api.post(`${Local.AUTH_ADMIN}`, data);
      toast.success(`${response.data.message}`);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      localStorage.setItem('adminToken', response.data.isAdmin);
      navigate('/admin/dashboard');
      return;
    }
    catch(err:any){
      console.log(err);
      toast.error(`${err.response.data.message}`);
    }
  }

    const loginMutation = useMutation({
        mutationFn: authUser
    })

    const LoginHandeler = (values:any) => {
        console.log(values);
        loginMutation.mutate(values);
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
          <div className="p-6" style={{ backgroundColor: '#3B82F6' }}>
            <h1 className="text-2xl font-bold text-white">Login</h1>
          </div>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={LoginHandeler}
          >
            <Form className="p-6">
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-[1.7vh] rounded-xl text-sm transition-all duration-200 border-[#bebebe] border-1"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password *
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-[1.7vh] rounded-xl text-sm transition-all duration-200 border-[#bebebe] border-1"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#3B82F6] font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95">
                Login
              </button>

            </Form>
          </Formik>

          <div className="p-6 border-t text-center">
            <p className="text-sm">
              Don't have an account? <Link to="/admin" className="text-blue-500 hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
