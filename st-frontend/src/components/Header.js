import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logout = () => {
        dispatch({ type: 'Logout' });
        setUser(null);
        navigate.push('/');
    }

    return (
    <div className="m-10 flex place-content-between">
        <div className="flex font-bold text-4xl text-[#F4D47E]">
            SPEED TYPER V2
        </div>
        <div className="flex bg-[#F4D47E] rounded-xl px-4 text-center">
            <div className="flex flex-col justify-center">
                {!user ? 
                <a href="http://localhost:3000/login" className="rounded-xl text-center text-white bg-green-500 px-4 p-2 my-2 mx-4">
                    LOG IN
                </a>
                :
                <div>
                    <div className="flex flex-col place-content-evenly">
                    <div className='font-bold p-1' >
                        {user.result.username}
                    </div>
                    <div>
                        <span className="font-bold">WPM</span> : {user.result.wpm}
                    </div>
                    </div>
                    <div onClick={logout} className="rounded-xl text-center text-black hover:cursor-pointer bg-red-500 px-4 p-2 my-2 mx-4">
                        LOG OUT
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
    )
}    

export default Header;