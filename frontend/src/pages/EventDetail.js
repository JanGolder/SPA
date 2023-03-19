// import { useParams} from "react-router-dom";
import EventItem from "../components/EventItem";
// useRouteLoaderData pozwala pobierać dane z loadera spoza struktury route, potrzebny jest dodatkowy parametr 'id' w route wskazany jako argument
import {useRouteLoaderData, json , redirect} from "react-router-dom";

const EventDetailPage = ()=>{

// const params = useParams();

const data = useRouteLoaderData('event-detail');
    return (
            <EventItem event={data.event} />
    );
};

export default EventDetailPage;

export async function loader( { request, params }) {
    // nie można wykorzystać hooka useParams w loaderze, ale można wykorzystać natywne parametry przekazywane w loaderze (request i params), obiekt params zawiera wszystkie parametry route
    const id = params.eventid
    // nie musimy stosować await, react-roter automatycznie obsłuży promise, ale tutaj zaimplementowana jest też obsługa błędu
    // return fetch('http://localhost:8080/events/' + id);

    const response = await fetch('http://localhost:8080/events/' + id);

    if(!response.ok){
        throw json({message: 'Could not fetch details for selected event.'},{status: 500})
    } else{
        return response;
    }
}
// obsługa usunięcia wpisu z wykorzystaniem params
export async function action({params, request}){
    const eventid = params.eventid;
    const response = await fetch('http://localhost:8080/events/' + eventid,{
        method: request.method,
    });
    if(!response.ok){
        throw json({message: 'Could not delete event.'},{status: 500})
    } 
    return redirect('/events')
}