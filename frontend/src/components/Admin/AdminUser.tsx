import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import Local from '../../environment/env';
import { queryClient } from '../../main';


const AdminUser:React.FC<any> = ({userType}) => {
    const [search, setSearch] = useState('');
    const [showUser, setShowUser] = useState({});
    const [editUser, setEditUser] = useState({});

    const updateUserStatus = async(UUID:any) => {
        try{
            await api.put(`${Local.UPDATE_USER_STATUS}`, {UUID}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success('User status updated successfully');
        }
        catch(err:any){
            toast.error(`${err.response.data.message}`);
        }
    }

    const getusers = async() => {
        try{
            const response = await api.get(`${Local.GET_ALL_USERS}?search=${search}&userType=${userType}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
            });
            return response.data;
        }
        catch(err:any){
            toast.error(`${err.response.data.message}`);
        }
    }

    const {data:users, isError, isLoading, error} = useQuery({
        queryKey: ['users', search, userType],
        queryFn: getusers
    })

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    if (isError) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        )
    }

    console.log("userType=====>   ",userType);
    console.log("Users=========+>", users)
  return (
    <div>
        <div className='bg-white pt-1 pb-2'>
            <div className='form-control ms-3 w-25 rounded-5 d-flex mt-3' >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='pt-2' >
                    <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#3E5677"/>
                </svg>
                <input type="text" name="search_friend" placeholder='search with name, email' className='w-100 form-control border-0 rounded-5' 
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
        </div>
        <table className="table text-center">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope='col' >Status</th>
                <th scope='col' >Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user:any)=>(
                    <tr>
                        <td> {user.firstname} {user.lastname} </td>
                        <td> {user.email} </td>
                        <td> {user.phone} </td>
                        <td>
                            <div className="form-check form-switch">
                                <div className='w-25 mx-auto me-3'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={()=>{updateUserStatus(user?.uuid)}} checked={user.status} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault" hidden />
                                </div>
                            </div>
                        </td>
                        <td className='d-flex justify-center color-primary' >
                            <i className="bi bi-eye text-[#307986] hover:cursor-pointer" />
                            <i className="bi bi-pen mx-3 text-[#307986] hover:cursor-pointer" />
                            <i className="bi bi-trash text-[#307986] hover:cursor-pointer" />
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
  )
}

export default AdminUser