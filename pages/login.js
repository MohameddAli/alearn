import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router';

const Login = () => {
    // const [username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // state
    const {state: {user}, dispatch} = useContext(Context);
    // console.log("STATE", state);

    // router
    const router = useRouter();

    // redirect if user is logged in
    useEffect(() => {
      if (user !== null) router.push('/user');
    }, [user, router]);
    

    console.log('Testing env', process.env.NEXT_PUBLIC_API);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const { data } = await axios.post(`/api/login`, {
          email,
          password
        });
        console.log('Login response', data);
        // toast.success('Logged in successfuly!!');
        dispatch({
          type: "LOGIN",
          payload: data
        });
        // save in local storage
        window.localStorage.setItem('user', JSON.stringify(data));
        // redirect
        router.push('/user');
        // enoemo77@gmail.com
        // setLoading(false);
      } catch (error) {
        toast.error(error.response.data);
        setLoading(false);
      }
    };

    return (
      <>
          <h1 className="p-5 jumbotron text-center bg-primary square">Login</h1>
          <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit} >

                <input 
                type="email" 
                className="form-control mb-4 p-4" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email or username"
                required
                />

                <input 
                type="password" 
                className="form-control mb-4 p-4" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                />

                {/* <br /> */}

                <button
                    type="submit"
                    className='btn btn-block btn-primary p-3 w-100'
                    disabled={!email || !password || loading}
                >
                    {loading ? <SyncOutlined spin /> : 'Submit'}
                </button>
            </form>

            <h4 className='text-center pt-3'>
              Not yet registered?{' '}
              <Link href='/register'>Register</Link>
            </h4>

            <h4 className='text-center'>
              {/* Forgot password?{' '} */}
              <Link href='/forgot-password' className='text-danger'>Forgot password</Link>
            </h4>
        </div>
      </>
    )
  }
  
export default Login;