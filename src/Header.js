import { Icon } from '@material-ui/core'
import { Business, Home, Message, MessageOutlined, Notifications, People, Search } from '@material-ui/icons'
import { Avatar } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import './App.css';


import React from 'react'
import { logout, selectUser } from './features/userSlice';

function HeaderOption({ title, Icon, avatar, operation }) {
    return (
        <div onClick={ operation} className="flex flex-col text-gray-500 hover:text-black" id="header-option">
            {Icon && <Icon  className="mx-auto text-lg "></Icon>}
            {avatar && <Avatar sx={{width:30, height:30}} className="mx-auto" src={avatar}></Avatar> }

            <p className="text-sm">{title}</p>
        </div>
    );
}

function Header() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className="flex w-screen bg-[#fff] fixed shadow-md z-50">
            <div className="  lg:w-8/12 md:w-full  mx-auto">
                <div className="flex justify-between mx-3.5 p-1 ">
                    <div className="flex justify-evenly gap-3  my-auto">
                        <div><img style={{ height: "30px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUKZsL///8AZME7eMgAWb7i6fUAXL/Az+oAYsFjj9B1m9QAYMBGgswAVr0AXb8AWr5ZjdBWh80ZbMTO3PCzx+drl9T2+f2Ssd7G1u0dbsXF1e3w9fs2dsfl7ffV4fIocsaApNmowOSMrNyrw+Wbt+AAUryFqNr2AL+0AAADz0lEQVR4nO3ca1+qMACAcZiA5ATMW+a98vT9P+LROkXiNruMLXae/2v1xyOy6QCjCAAAAAAAAAAAAAAAAAAAALBGnPjeiPbkZSJ36/W4qmSQlbIYTTfxyXx72CXBNYpkv4o/mAwDayx7m7hhWoWUWM2afUebcTiJ5UAReDweo1AS5VAZeNyLgXxQhZxrCo/Hou+NsyJ70AXGcS+EnSgifWC8SHxvngXyzlAYhzCeJqmp8FH63r4fE8IUGC+6P9YI3VTxatP9AzFXz/bvCt8b+GNyT2HX5aov3UEVip4xMO3+SBNlxsJp6Xv7fq5amApn3Z/xzQfivAzgW1tUrPSFDwF8SM1zfiDLisUk5KPwREjN5/QpgKnilbhXrmP0uz/bvxPR9jLwEFDgacm7+Ut/c5v53ijLSvHw4WhMB0Xue4usE2U1vOtv03Qy3e+S8PpeCJlVSZKVgcyCAIDfT+SyrI6Ok0+As4+QVbGbHabLxWTRf7qb7YrMa6XIdZpbpX3k2QPzSuyXjV8rk8dd4i1SjG90bs+3SQx1D7yvH5gnt0vlr830ufK06mNYMW2cl8nUm370/laIYmQ4W3covSwaGAob68FZ/1phudOuiLyYDwoPu9FeoSiejX0nE+H+Z4u1QiHNO/DVfOh8hdJWYT42LLx+NHN9XtlSoVxrL8tpGjheILFTqFmvU7txO6RaKZT5Jz+ir9xeiWSl8M9nBpnayunVqzYKh9eniXNTl8vpVvbhFwOP74nDadFG4RdGmbeXdriibqPwG2budqKnQofXQHgqjIfOhlNfhX1nX958FcaZq53ordDZOXRvhVNXX8DtF87TNP3EDLlyNZpaLlwOxkWSJIWYXX20q4vIrRY+jat/S4tCVmPjBWXuDkSLhave2V02ojDeBxAfHK1n2CvcZs1vYhcXQJxZOhpqrBWqvofpr7fSPOE3F84vTgKcXvze9AxHvy9sFY6U40Zleo6jMxmWChfqHWK8n8PRdGGpULe4lBiWqHZdKtzqRg3TkxwtudkpfNbN3tKwSNWpQu0hJQyrVF0q3GgHftPNcV0qXOp/sBdhFBou6jcMpl0qNNxrmlz8XUMnC/fBFw7067uGG40ptITCGoVqFLaPwhqFahS2j8IahWoUto/CGoVqFLaPwhqFahS2j8IahWoUto/CGoVqFLaPwhqFahS2j8IahWoUto/CGoVqFLaPwlqAhc1/4NHfx2Qq9H7lXhT1dNaNf1HqDc/djt4YrroXa+3rtx1Wb4PWlQfq/zPrWy8PAAAAAAAAAAAAAAAAAAAA4D/0F5lQSZ+5G/qbAAAAAElFTkSuQmCC"></img></div>
                        <div className="flex-row my-auto bg-[#eef3f8] p-1 rounded-md">
                            <Search></Search>
                            <input className="bg-[#eef3f8] outline-none" placeholder="Search for jobs,skill,..."></input>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 mr-10  my-auto ">
                        <HeaderOption title="Home" Icon={Home}></HeaderOption>
                        <HeaderOption title="People" Icon={People}></HeaderOption>
                        <HeaderOption title="Message" Icon={Message}></HeaderOption>
                        <HeaderOption title="Jobs" Icon={Business}></HeaderOption>


                        <HeaderOption title="Notification" Icon={Notifications}></HeaderOption>

                        <HeaderOption operation={e=>dispatch(logout())} title="Logout" avatar={user ? user.photoUrl:"https://cdn-icons-png.flaticon.com/512/147/147142.png"}></HeaderOption>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
