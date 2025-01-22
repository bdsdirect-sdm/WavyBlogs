import { useQuery, useMutation } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import GoBack from '../common/components/GoBack';
import Button from '../common/components/CommonButton';
import { basicValidatorSchema, personalValidatorSchema } from '../yup/Validator'
import { toast } from 'react-toastify'
import '../styling/profile.css'
import api from '../api/axiosInstance' 
import Local from '../environment/env'
import React, { useState, useRef } from 'react'
import { queryClient } from '../main'

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1) // 1 for basic details & 2 for personal details
  const fileInputRef = useRef(null);

  const updateBasic = async (data: any) => {
    try {
      const response = await api.post(
        `${Local.UPDATE_BASIC_USER_DETAIL}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success(`${response.data.message}`)
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      return
    } catch (err: any) {
      toast.error(`${err.response.messsage}`)
    }
  }

  const updatePersonal = async (data: any) => {
    try {
      const response = await api.post(
        `${Local.UPDATE_PERSONAL_USER_DETAIL}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success(`${response.data.message}`)
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        return
    } catch (err: any) {
      toast.error(`${err.response.messsage}`)
    }
  }

  const updateProfileMutation = useMutation({
    mutationFn: activeTab == 1 ? updateBasic : updatePersonal,
  })

  const getProfile = async () => {
    try {
      const response = await api.get(`${Local.GET_PROFILE}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user
    } catch (err: any) {
      toast.error(`${err.response.data.message}`)
    }
  }

  const {data: user, isLoading, error, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const updateProfileHandler = (values: any) => {
    updateProfileMutation.mutate(values)
  }

  const updatePhoto = async(data:any) => {
    try{
      const response = await api.post(`${Local.UPDATE_PROFILE_PHOTO}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
      return;
    }
    catch(err:any){
      toast.error(`${err.response.data.message}`)
      return;
    }
  }

  const profile_photo_update = async(photo:any) => {
    const formData = new FormData();
    formData.append('profile_photo', photo);
    updatePhoto(formData);
  }

  return (
    <div>
      <GoBack text='Profile' />

      <div className='mx-2 mt-2 rounded'>
        <div className='d-flex justify-content-between align-items-center cw-clr py-4 rounded-top-2'>
          <h1 className='fw-bold mx-auto cw-clr display-1 '>My PROFILE</h1>
        </div>
      </div>

      <div className='photo ms-5 mb-0 main-img-div '>
        <div className='d-flex photo  '>
          {user?.profile_photo && (
            <img
              src={`${Local.BASE_URL}${user?.profile_photo}`}
              alt='User Profile'
              className='rounded-circle border'
              style={{ width: '100px', height: '100px' }}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            />
          )}
          {!user?.profile_photo && (
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstname} ${user?.lastname}`}
              alt='User Profile'
              className='rounded-circle border'
              style={{ width: '100px', height: '100px' }}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            />
          )}
          <p className=' mt-[-20px] ms-4 text-white fs-5 fw-semibold'>
            Upload a New Photo
          </p>
          {/* Add button here for upload picture */}
          
          <button className='btn btn-light h-11 w-44 ms-[32vw] mt-[-11px]' onClick={()=>fileInputRef?.current?.click()} >Change Picture</button>
          <input ref={fileInputRef} type="file" accept='image/jpg, image/png, image/jpeg' hidden onChange={(e:any)=>{profile_photo_update(e.currentTarget.files[0])}} />

        </div>
      </div>

      <div className='CI'>
        <p className='fs-5'> Change Information </p>
      </div>

      <div className='pt-4 mt-0 mx-2 text-secondary bg-white ps-4 rounded-2 snd-rel-div'>
        <div>
          <div className='flex space-x-8 px-2 '>
            <button
              className={`text-[#3C3D3E] pt-1 font-semibold ${
                activeTab === 1 ? 'border-b-4 border-[#3E5677]' : ''
              }`}
              onClick={() => {
                setActiveTab(1)
              }}
            >
              Basic Details
            </button>
            <button
              className={`text-[#3C3D3E] pt-1 font-semibold ${
                activeTab === 2 ? 'border-b-4 border-[#3E5677]' : ''
              }`}
              onClick={() => {
                setActiveTab(2)
              }}
            >
              Personal Details
            </button>
          </div>

          <div>
            {/* Basic details Form */}
            {activeTab === 1 && (
              <Formik
                initialValues={{
                  firstname: user?.firstname || '',
                  lastname: user?.lastname || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  address_one: user?.address_one || '',
                  address_two: user?.address_two || '',
                  city: user?.city || '',
                  state: user?.state || '',
                  zip_code: user?.zip_code || ''
                }}
                validationSchema={basicValidatorSchema}
                onSubmit={updateProfileHandler}
              >
                {() => (
                  <Form className='py-4 me-4' >
                    <div className='row mb-3'>
                      <div className='col-md-6'>
                        <label className='form-label text-sm'>First Name <span className='text-danger' >*</span> </label>
                        <Field
                          type='text'
                          name='firstname'
                          className='form-control'
                          placeholder="Enter your first name"
                        />
                        <ErrorMessage
                          name='firstname'
                          component='div'
                          className='text-danger'
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label text-sm'>Last Name <span className='text-danger' >*</span> </label>
                        <Field
                          type='text'
                          name='lastname'
                          className='form-control'
                          placeholder='Enter your last name'
                        />
                        <ErrorMessage
                          name='lastname'
                          component='div'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-md-6'>
                        <label className='form-label text-sm'>Email <span className='text-danger' >*</
                        span> </label>
                        <Field
                        type='email'
                        name='email'
                        className='form-control'
                        placeholder='Enter your email'
                        />
                        <ErrorMessage
                        name='email'
                        component='div'
                        className='text-danger'
                        />
                        </div>
                        <div className='col-md-6'>
                          <label className='form-label text-sm'>Phone Number <span className='text-danger' >
                            </span> </label>
                            <Field
                            type='text'
                            name='phone'
                            className='form-control'
                            placeholder='Enter your phone number'
                            maxLength={10}
                            />
                            <ErrorMessage
                            name='phone'
                            component='div'
                            className='text-danger'
                            />
                            </div>
                        </div>
                        <div className='row mb-3'>
                          <div className='col-md-6'>
                            <label className='form-label text-sm'>Address One <span className='text-danger' >*</span> </label>
                            <Field
                            type='text'
                            name='address_one'
                            className='form-control'
                            placeholder='Enter your address'
                            />
                            <ErrorMessage
                            name='address_one'
                            component='div'
                            className='text-danger'
                            />
                            </div>
                            <div className='col-md-6'>
                              <label className='form-label text-sm'>Address Two</label>
                              <Field
                              type='text'
                              name='address_two'
                              className='form-control'
                              placeholder='Enter Other Address(if any)'
                              />
                              <ErrorMessage
                              name='address_two'
                              component='div'
                              className='text-danger'
                              />
                          </div>
                        </div>
                        <div className='row mb-4'>
                          <div className='col-md-6'>
                            <label className='form-label text-sm'>City <span className='text-danger' >*</span> </label>
                            <Field
                            type='text'
                            name='city'
                            className='form-control'
                            placeholder='Enter your city'
                            />
                            <ErrorMessage
                            name='city'
                            component='div'
                            className='text-danger'
                            />
                            </div>
                          <div className='col-md-6'>
                            <label className='form-label text-sm'>State <span className='text-danger' >*</span> </label>
                            <Field
                            type='text'
                            name='state'
                            className='form-control'
                            placeholder='Enter your state'
                            />
                            <ErrorMessage
                            name='state'
                            component='div'
                            className='text-danger'
                            />
                          </div>
                        </div>
                        <div className='row mb-4'>
                          <div className='col-md-6'>
                            <label className='form-label text-sm'>Zip Code <span className='text-danger' >*</span> </label>
                            <Field
                            type='text'
                            name='zip_code'
                            className="form-control"
                            maxLength={6}
                            placeholder="Enter Zip code of your area"/>
                            <ErrorMessage
                            name='zip_code'
                            component='div'
                            className='text-danger'
                            />
                          </div>
                          
                        </div>
                        <div className='w-48 ms-auto' >
                          <Button text="Update" type="submit"/>
                        </div>
                  </Form>
                )}
              </Formik>
            )}

            {activeTab === 2 && (
              <Formik
              initialValues={{
                dob: user?.dob || '',
                gender: user?.gender || '',
                martial_status: user?.martial_status || '',
                social_security: user?.social_security || '',
                social: user?.social || '',
                kids: user?.kids || '',
              }}
              validationSchema={personalValidatorSchema}
              onSubmit={updateProfileHandler}
            >
              {() => (
                <Form className='py-4 me-4' >
                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label text-sm'>DOB <span className='text-danger' >*</span> </label>
                      <Field
                        type='date'
                        name='dob'
                        className='form-control'
                        placeholder="Enter your Date"
                        onFocus={(e:any) => e.target.showPicker?.()}
                      />
                      <ErrorMessage
                        name='dob'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label text-sm'>Gender <span className='text-danger' >*</span> </label>
                      <Field as='select' name='gender' className='form-select'>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Other</option>
                      </Field>
                      <ErrorMessage
                        name='gender'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label text-sm'>Martial Status </label>
                      <Field as='select' name='martial_status' className='form-select'>
                        <option value="" disabled>Select Martial Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                      </Field>
                      <ErrorMessage
                      name='martial status'
                      component='div'
                      className='text-danger'
                      />
                      </div>
                      <div className='col-md-6'>
                        <label className='form-label text-sm'>Social Security(Number only) <span className='text-danger' ></span> </label>
                          <Field
                          type='text'
                          name='social_security'
                          className='form-control'
                          placeholder='Enter your Security number'
                          />
                          <ErrorMessage
                          name='social_security'
                          component='div'
                          className='text-danger'
                          />
                          </div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-md-6'>
                          <label className='form-label text-sm'>Social </label>
                          <Field
                          type='text'
                          name='social'
                          className='form-control'
                          placeholder='Social'
                          />
                          <ErrorMessage
                          name='social'
                          component='div'
                          className='text-danger'
                          />
                          </div>
                          <div className='col-md-6'>
                            <label className='form-label text-sm'>Kids (if Any)</label>
                            <Field
                            type='text'
                            name='kids'
                            className='form-control'
                            placeholder='Enter number of kids'
                            />
                            <ErrorMessage
                            name='kids'
                            component='div'
                            className='text-danger'
                            />
                        </div>
                      </div>
                      <div className='w-48 ms-auto' >
                        <Button text="Update" type="submit"/>
                      </div>
                </Form>
              )}
            </Formik>
            ) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
