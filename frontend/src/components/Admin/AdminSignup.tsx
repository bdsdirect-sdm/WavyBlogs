import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import Local from '../../environment/env';
import { toast } from 'react-toastify';

// Yup Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  fullname: Yup.string()
    .min(2, 'Full Name must be at least 2 characters')
    .required('Full Name is required'),
});


const AdminSignup:React.FC = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

  useEffect(()=>{
    if (adminToken) {
      navigate('/admin/dashboard');
    }
  },[]);

  const addAdmin = async(data:any) => {
    try{
      const response = await api.post(`${Local.REGISTER_ADMIN}`, data);
      toast.success(`${response.data.message}`);
      navigate('/admin/login');
      return;
    }
    catch(err:any){
      console.log(err);
      toast.error(`${err.response.data.message}`);
    }
  }

  const signupMutation = useMutation({
    mutationFn: addAdmin
  })

  const handlesubmit = (values:any) => {
    console.log(values);
    const {confirmPassword, ...data} = values;
    signupMutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
          <div className="p-6" style={{ backgroundColor: '#3B82F6' }}>
            <h1 className="text-2xl font-bold text-white">Register</h1>
          </div>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              fullname: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handlesubmit}
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
                  className="w-full px-4 rounded-xl text-sm transition-all duration-200 py-[1.7vh] border-[#bebebe] border-1"
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
                  New Password *
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 rounded-xl text-sm transition-all duration-200 py-[1.7vh] border-[#bebebe] border-1"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 rounded-xl text-sm transition-all duration-200 py-[1.7vh] border-[#bebebe] border-1"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="fullname" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Field
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full px-4 rounded-xl text-sm transition-all duration-200 py-[1.7vh] border-[#bebebe] border-1"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#3B82F6] font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95">
                Register
              </button>

            </Form>
          </Formik>

          <div className="p-6 border-t text-center">
            <p className="text-sm">
              Already have an account? <Link to="/admin/login" className="text-blue-500 hover:underline">Login</ Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
