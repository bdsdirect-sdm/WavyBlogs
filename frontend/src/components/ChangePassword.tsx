import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik , Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import sideimg from '../assets/images/Layer_1.png';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import Local from '../environment/env';
import Button from '../common/components/CommonButton';
import { toast } from 'react-toastify';
import GoBack from '../common/components/GoBack';

const ChangePassword:React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [pass1type, setPass1Type] = useState('password');
  const [pass1visible, setPass1Visible] = useState(0);
  const [pass2type, setPass2Type] = useState('password');
  const [pass2visible, setPass2Visible] = useState(0);
  const [pass3type, setPass3Type] = useState('password');
  const [pass3visible, setPass3Visible] = useState(0);
  
  const validationSchema = Yup.object().shape({
    prevPass: Yup.string().required('Old password is required'),
    newPass: Yup.string().min(8, "Password must be atleast 8 characters long").required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[`~!@#$%^&*()"?<>|:{}(),.]/, "Password must contain at least one special Character"),
    confirmPass:  Yup.string().required("Confirm Password is required")
    .oneOf([Yup.ref('newPass')], 'Passwords must match')
  });

  const updatePassword = async(data:any) => {
    try{
      const response = await api.put(`${Local.EDIT_PASSWORD}`, {data}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          },
      })
      toast.success(`${response.data.message}`);
      navigate('/app/dashboard');
    }
    catch(err:any){
      toast.error(`${err.response.data.message}`);
    }
  }

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword
  })

  const updateHandler = (values:any) => {
    const {confirmPassword, ...data} = values
    updatePasswordMutation.mutate(data);
  }
  return (
    <div>
      <div>
        <GoBack text="Change Passwords" />
      </div>

      <div className='bg-white rounded pb-4' >
        <div className='row ' >
          <div className='m-2 col-6' >
            <Formik
            initialValues={{
              prevPass: '',
              newPass: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={updateHandler}
            >
              {()=>(
                <Form className='' >
                  <div className='ms-3 '>
                    <label className="form-label text-secondary"> Old Password </label>
                    <div className='d-flex form-control ' >
                      <Field type={pass1type} name="prevPass" className="form-control border-0 focus-ring-dark w-100 " placeholder="* * * * * *" />
                      {pass1visible==1 && (
                        <i className="bi bi-eye me-3 pt-1 text-secondary" onClick={()=>{
                          setPass1Visible(0);
                          setPass1Type('password');
                        }} ></i>
                      )}
                      {pass1visible==0 && (
                        <i className="bi bi-eye-slash me-3 pt-1 text-secondary" onClick={()=>{
                        setPass1Visible(1);
                        setPass1Type('text');
                        }} ></i>
                      )}
                    </div>
                      <ErrorMessage component='div' name="prevPass" className="text-danger ms-2" />
                  </div>
                  <div className='ms-3 mt-2 '>
                    <label className="form-label text-secondary"> New Password </label>
                    <div className='d-flex form-control ' >
                      <Field type={pass2type} name="newPass" className="form-control border-0 focus-ring-dark w-100 " placeholder="* * * * * *" />
                      {pass2visible==1 && (
                        <i className="bi bi-eye me-3 pt-1 text-secondary" onClick={()=>{
                          setPass2Visible(0);
                          setPass2Type('password');
                        }} ></i>
                      )}
                      {pass2visible==0 && (
                        <i className="bi bi-eye-slash me-3 pt-1 text-secondary" onClick={()=>{
                        setPass2Visible(1);
                        setPass2Type('text');
                        }} ></i>
                      )}
                    </div>
                      <ErrorMessage component='div' name="newPass" className="text-danger ms-2" />
                  </div>
                  <div className='ms-3 mt-2 '>
                    <label className="form-label text-secondary"> Old Password </label>
                    <div className='d-flex form-control ' >
                      <Field type={pass3type} name="confirmPass" className="form-control border-0 focus-ring-dark w-100 " placeholder="* * * * * *" />
                      {pass3visible==1 && (
                        <i className="bi bi-eye me-3 pt-1 text-secondary" onClick={()=>{
                          setPass3Visible(0);
                          setPass3Type('password');
                        }} ></i>
                      )}
                      {pass3visible==0 && (
                        <i className="bi bi-eye-slash me-3 pt-1 text-secondary" onClick={()=>{
                        setPass3Visible(1);
                        setPass3Type('text');
                        }} ></i>
                      )}
                    </div>
                      <ErrorMessage component='div' name="confirmPass" className="text-danger ms-2" />
                  </div>

                  <div className='mt-4 ' >
                    <div className='w-25 ms-auto' >
                      <Button text='Update' type='submit' />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className='col-5 my-auto ms-5 ps-5 '>
            <img src={`${sideimg}`} alt="password_img" height={'270px'} className='ms-5'  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword