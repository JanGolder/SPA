import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
    {id: 'id1',
    name: 'Event one'},
    {id: 'id2',
    name: 'Event two'},
    {id: 'id3',
    name: 'Event three'}
]

const EventsPage = ()=>{

    return (
        <>
        <h1>Events Page</h1>        
        <ul>
        {DUMMY_EVENTS.map(event => <li key={event.id}><Link to={event.id}>{event.name}</Link></li>)}            
        </ul>

        </>

    )
};

export default EventsPage;