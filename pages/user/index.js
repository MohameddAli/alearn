import { useContext } from 'react';
import { Context } from '../../context';
import UserRoute from '../../components/routes/UserRoute';

const UserIndex = () => {
    const { state: {user} } = useContext(Context);

    return (
        <UserRoute>
            <h1 className="p-5 jumbotron text-center square">
                User Dashboard
            </h1>
        </UserRoute>
    )
}

export default UserIndex;