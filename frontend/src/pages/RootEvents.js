import { Outlet } from "react-router-dom";
import EventNavigation from '../components/EventsNavigation';

const RootEvents = ()=>{

    return (
        <>
        <EventNavigation/>
            <Outlet/>
                </>
    )

};

export default RootEvents;