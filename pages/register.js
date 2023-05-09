import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router'

const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const {state: {user}} = useContext(Context);

    const router = useRouter();
    // redirect if user is logged in
    useEffect(() => {
      if (user !== null) router.push('/');
    }, [user])

    console.log('Testing env', process.env.NEXT_PUBLIC_API);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const { data } = await axios.post(`/api/register`, {
          name,
          username,
          email,
          password
        });
        // console.log('Register response', data);
        toast.success('Registration successful. Please login.');
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data);
        setLoading(false);
      }
    };

    return (
      <>
          <h1 className="p-5 jumbotron text-center bg-primary square">Register</h1>
          <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit} >
                <input 
                type="text" 
                className="form-control mb-4 p-4" 
                value={name} 
                onChange={e => setName(e.target.value)}
                placeholder="Enter name"
                required
                />

                <input 
                type="text" 
                className="form-control mb-4 p-4" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                required
                />

                <input 
                type="email" 
                className="form-control mb-4 p-4" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
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
                    disabled={!name || !username || !email || !password || loading}
                >
                    {loading ? <SyncOutlined spin /> : 'Submit'}
                </button>

            </form>
            <h4 className='text-center p-3'>
                Already registered?{' '}
                <Link href='/login'>Login</Link>
            </h4>
        </div>
      </>
    )
  }
  
export default Register