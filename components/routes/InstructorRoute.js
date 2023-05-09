import { useState, useEffect, useContext } from 'react';
// import { Context } from '../../context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import InstructorNav from '../nav/InstructorNav';

const InstructorRoute = ({ children }) => {
    const [ok, setOk] = useState(false);
    // now we dont use it so we can deleted from this page const { state: {user} } = useContext(Context);
    // router
    const router = useRouter();

    const fetchInstructor = async () => {
        try {
            const { data } = await axios.get('/api/current-instructor');
            console.log('Instructor Route:', data);
            if (data.ok) setOk(true);
        } catch (err) {
            console.log('Error:', err);
            setOk(false);
            router.push('/');
        }
    };

    // use fetchUser() to get user info from backend using useEffect
    useEffect(() => {
        fetchInstructor();
    }, []);

    return (
        <>
        {!ok ? 
        <SyncOutlined spin className='d-flex justify-content-center display-1 text-primary p-5' /> 
        : 
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <InstructorNav />
                </div>
                <div className='col-md-10'>
                    {children}
                </div>
            </div>
        </div>}
        {/* {!hidden && <h1 className="p-5 jumbotron text-center square">
            <pre>
                {JSON.stringify(user, null, 4)}
            </pre>
        </h1>} */}
        {/* {!ok ? (
        <h1>Loading user data...</h1>
        ) : (
        <><h3 className="p-5 jumbotron text-center square">Your User Data: <pre>{JSON.stringify(user, null, 4)}</pre></h3></>
        )} */}
        </>
    )
}

export default InstructorRoute;