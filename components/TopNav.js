import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import {
    AppstoreOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    CoffeeOutlined,
    CarryOutOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { Context } from '../context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const { Item, SubMenu, ItemGroup } = Menu; // destructuring Menu.Item

const TopNav = () => {
    const [current, setCurrent] = useState('');

    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        // console.log(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async (req, res) => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get(`/api/logout`);
        toast(data.message);
        console.log(data);
        router.push("/login");
    };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}  style={{ display: 'flex', justifyContent: 'flex-end' }} >
        <Item key="/" onClick={e => setCurrent(e.key)} icon={<AppstoreOutlined />}>
            <Link href="/" className=''>
                App
            </Link>
        </Item>

        {user && user.role && user.role.includes("Instructor") ? (
            <Item 
                key="/instructor/course/create" 
                onClick={e => setCurrent(e.key)} 
                icon={<CarryOutOutlined />}
            >
                <Link href="/instructor/course/create" className=''>
                    Create Course
                </Link>
            </Item>
        ) : (
            <Item 
                key="/user/become-istructor" 
                onClick={e => setCurrent(e.key)} 
                icon={<TeamOutlined />} 
            >
                <Link href="/user/become-instructor" className=''>
                    Become Instructor
                </Link>
            </Item>
        ) }

        {user === null && (
            <>
                <Item key="/login" onClick={e => setCurrent(e.key)} icon={<LoginOutlined />} >
                    <Link href="/login" className=''>
                        Login
                    </Link>
                </Item>
                <Item key="/register" onClick={e => setCurrent(e.key)} icon={<UserAddOutlined />} >
                    <Link href="/register" className=''>
                        Register
                    </Link>
                </Item>
            </>
        )}

        {user && user.role && user.role.includes("Instructor") &&  (
            <Item 
                key="/istructor" 
                onClick={e => setCurrent(e.key)} 
                icon={<TeamOutlined />}
                style={{ marginLeft: 'auto' }}
            >
                <Link href="/instructor">
                    Instructor
                </Link>
            </Item>  
        )}
        {user !== null && (
            <SubMenu icon={<CoffeeOutlined />} title={user && user.name}>
                <ItemGroup>
                    <Item key="/user" style={{ float: 'right' }}>
                        <Link href="/user">
                            Dashboard
                        </Link>
                    </Item>
                    <Item key="/logout" onClick={logout} icon={<LogoutOutlined />}>
                        Logout
                    </Item>
                </ItemGroup>
            </SubMenu>
        )}
    </Menu>
  )
}

export default TopNav