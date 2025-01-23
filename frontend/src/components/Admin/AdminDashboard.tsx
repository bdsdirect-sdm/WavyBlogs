import React from 'react';
import { useQuery } from '@tanstack/react-query';
import '../../styling/admin/dashboard.css';
import AdminUser from './AdminUser';
import AdminWave from './AdminWave';
import AdminNavbar from './AdminNavbar';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import Local from '../../environment/env';

const AdminDashboard:React.FC = () => {
    const [view, setView] = React.useState(1); // 1 for users 2 for waves
    const [userType, setUsertype] = React.useState(1); // 1 for All users 2 for Active Users 3 for All Users

    const getValues = async() => {
        try{
            const response = await api.get(`${Local.GET_VALUES}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                console.log(response.data)
                return response.data;
        }
        catch(err:any){
            toast.error(`${err.response.data.message}`);
        }
    }
    
    const { data, error, isLoading, isError} = useQuery({
        queryKey: ["dashboarddata"],
        queryFn: getValues
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

  return (
    <>
        <AdminNavbar />
        <div className='container bg-secondary-subtle rounded' >
            <div>
                <div className='mt-1'>
                    <p className='text-[12px] fw-light text-[#3E5677]'>DASHBOARD</p>
                    <p className='fw-bold text-lg text-[#3E5677]' >OverView</p>
                </div>
                <div>
                    <div className='d-flex flex-wrap justify-around mt-5' >
                        
                        <div className="card text-center mb-3 card-hover transform hover:scale-110 transition-transform duration-300 ease-in-out " style={{width: '15rem'}} onClick={() => {
                            setUsertype(1);
                            setView(1); 
                            }}>
                            <div className="card-body p-0">
                                <div className=''>
                                    <i className="bi bi-bar-chart-line ms-[200px]" onClick={()=>{alert("Pie chart of user")}} />
                                </div>
                                <div className=' mt-2 text-[#3E5677]'>
                                    <p className="text-[11.5px] mt-auto uppercase">Total Users</p>
                                    <p className="card-text fw-semibold fs-4 ">{data?.totalUsers?data?.totalUsers:0}</p>
                                </div>
                                
                            </div>
                        </div>

                        <div className="card text-center mb-3 card-hover transform hover:scale-110 transition-transform duration-300 ease-in-out " style={{width: '15rem'}} onClick={() => {
                            setUsertype(2);
                            setView(1);
                            }}>
                            <div className="card-body">
                                <div className=' mt-4 text-[#3E5677]'>
                                    <p className="text-[11.5px] mt-auto uppercase"> Active Users</p>
                                    <p className="card-text fw-semibold fs-4 "> {data?.activeUsers?data?.activeUsers:0} </p>
                                </div>
                                
                            </div>
                        </div>

                        <div className="card text-center mb-3 card-hover transform hover:scale-110 transition-transform duration-300 ease-in-out " style={{width: '15rem'}} onClick={() => {
                            setUsertype(3);
                            setView(1);
                            }}>
                            <div className="card-body">
                                <div className=' mt-4 text-[#3E5677]'>
                                    <p className="text-[11.5px] mt-auto uppercase">InActive Users</p>
                                    <p className="card-text fw-semibold fs-4 "> {data?.inactiveUsers?data?.inactiveUsers:0} </p>
                                </div>
                                
                            </div>
                        </div>

                        <div className="card text-center mb-3 card-hover transform hover:scale-110 transition-transform duration-300 ease-in-out " style={{width: '15rem'}} onClick={() => setView(2)}>
                            <div className="card-body p-0">
                                <div>
                                    <i className="bi bi-bar-chart-line ms-[200px]" onClick={()=>{alert("Pie chart of user")}} />
                                </div>
                                <div className=' mt-4 text-[#3E5677]'>
                                    <p className="text-[11.5px] mt-auto uppercase">Total Waves</p>
                                    <p className="card-text fw-semibold fs-4 "> {data?.totalWaves?data?.totalWaves:0} </p>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>


                </div>
            </div>

            <div>
                {view==1? (<AdminUser userType={`${userType}`} />) : (<AdminWave />)}
            </div>
        </div>
    </>
  )
}

export default AdminDashboard