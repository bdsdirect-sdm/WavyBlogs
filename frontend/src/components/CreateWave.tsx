import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styling/createwave.css';
import Button from '../common/components/CommonButton';
import { toast } from 'react-toastify';
import Local from '../environment/env';
import { queryClient } from '../main';
import GoBack from '../common/components/GoBack';

const CreateWave: React.FC = () => {
  const navigate  = useNavigate();
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState('DESC');
  const token = localStorage.getItem('token');
  const user = JSON.parse(`${localStorage.getItem('user')}`);
  
  const addWave = async (data: FormData) => {
    try {
      const response = await api.post(Local.CREATE_WAVE, data, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['waves'],
      })
      navigate(0);
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  const getMyWaves = async() => {
    try{
      const response = await api.get(`${Local.GET_MY_WAVES}?find=${search}&orderBy=${orderBy}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    }
    catch(err:any){
      toast.error(`${err.response.data.message}`);
    }
  }

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['waves', search, orderBy],
    queryFn: getMyWaves
  })

  const WaveMutation = useMutation({
    mutationFn: addWave,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    },
    onSuccess: () => {
      toast.success('Wave created successfully!');
      // navigate('/app/dashboard');
    },
  });

  console.log(data);

  const validationSchema = Yup.object().shape({
    video: Yup.mixed().notRequired(),
    photo: Yup.mixed().required('Image is required'),
    text: Yup.string().required('Text is required'),
  });

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    WaveMutation.mutate(formData);
    // resetForm({values:{photo:null, video:null, text:""}});
  };

  if(isLoading){
    return (<div>Loading...</div>)
  }

  if (isError) {
    return (<div> {error.message}</div>)
  }

  return (
    <div>
      <GoBack text="Create Waves" />

      <div className="mx-2 mt-2 rounded">
        <div className="d-flex justify-content-between align-items-center cw-clr py-4 rounded-top-2">
          <h1 className="fw-bold mx-auto cw-clr display-1 ">Create Waves</h1>
        </div>
      </div>

      <div className="photo ms-5 mb-0 main-img-div ">
        <div className="d-flex photo  ">
          {(user.profile_photo) && (
          <img
            src={`${Local.BASE_URL}${user.profile_photo}`}
            alt="User Profile"
            className="rounded-circle border"
            style={{ width: "100px", height: "100px" }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          )}
          {!(user.profile_photo) && (
          <img
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstname} ${user.lastname}`}
            alt="User Profile"
            className="rounded-circle border"
            style={{ width: "100px", height: "100px" }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          )}
          <p className="mt-4 ms-4 text-white fs-5 fw-semibold"> {user.firstname} {user.lastname} </p>
        </div>
      </div>

      <div className="pt-4 mt-0 mx-2 text-secondary bg-white ps-4 rounded-bottom-2 snd-rel-div ">
        <p className="small">What do you want to share?</p>
        <Formik
          initialValues={{
            video: null,
            photo: null,
            text: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form encType="multipart/form-data">
              <div className="me-4 mb-3">
                <input
                  type="file"
                  name="photo"
                  onChange={(e: any) => setFieldValue('photo', e.currentTarget.files[0])}
                  accept='image/jpg, image/jpeg, image/png'
                  className="form-control"
                />
                <ErrorMessage component="div" name="photo" className="text-danger" />
              </div>
              <div className="me-4 mb-3">
                <input
                  type="file"
                  name="video"
                  accept='video/mp4, video/avi, video/mov'
                  onChange={(e: any) => setFieldValue('video', e.currentTarget.files[0])}
                  className="form-control"
                />
              </div>
              <div className="me-4 mb-3">
                <Field
                  as="textarea"
                  name="text"
                  placeholder="Write Something..."
                  className="form-control"
                  rows={3}
                />
                <ErrorMessage component="div" name="text" className="text-danger" />
              </div>

              <div>
                <Button text="Create Wave" type="submit" />
              </div>
            </Form>
          )}
        </Formik>

        {/* search */}
        <div className='d-flex mt-4' >
          <div className='d-flex ' >
            
            <div className='form-control w-100 rounded-5 d-flex ' >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='pt-2' >
                <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#3E5677"/>
              </svg>
              <input type="text" name="search_friend" placeholder='search' className='w-100 form-control border-0 rounded-5' 
              onKeyDown={(e:any)=>{
                if(e.key == 'Enter'){
                  setSearch(e.target.value);
                }
              }}
              />
              <i className="bi bi-arrow-clockwise fs-5 pt-1" onClick={()=>{
                setSearch('');
              }}/>
            </div>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" 
            onClick={()=>{setOrderBy(orderBy=="DESC"? "ASC": "DESC")}}
            >
              <path d="M16 23H28V21H16V23ZM13 16V18H31V16H13ZM20 28H24V26H20V28Z" fill="#BEA370"/>
            </svg>
          </div>
        </div>

      <div className='pb-2' >
        <div className="col-12 my-3 ">

          {(data.length>0) && (
            <>
              {data.map((wave:any)=>(
                <div className="p-1 wave-card rounded me-4 mb-3" key={wave.uuid} >
                  <div className='d-flex pb-0' >
    
                    <div className='d-flex ' >
                      <div className='' >
                        <img
                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstname} ${user.lastname}`}
                        alt="User Profile"
                        className="rounded-circle border"
                        style={{ width: "50px", height: "50px" }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        />
                      </div>
    
                      <div className='ms-3 small' >
                        <p className='mb-0 mt-1 fw-bold cmn-clr ' >{ user.email }</p>
                        <p className='mt-0 ' > {wave.text} </p>
                      </div>
    
                    </div>
    
                    <div className='ms-auto mt-3 me-4' >
                      {(wave.isactive) && (
                        <p className='badge bg-success fw-medium rounded-4 px-3' >Active</p>
                      )}
                      {!(wave.isactive) && (
                        <p className='badge bg-danger fw-medium rounded-4 px-3' >In Active</p>
                      )}
                    </div>
    
                  </div>
                </div>
              ))}
            </>
          )}
          {(data.length==0) && (
            <div className='text-center mt-5' >
              <h4>Currently, Don't have any wave</h4>
            </div>
          ) }


        </div>
      </div>
      </div>
    </div>
  );
};

export default CreateWave;
