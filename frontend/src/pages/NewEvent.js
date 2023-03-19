// funkcja redirect przekierowuje na konkretny route wskazany jako parametr
import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return <EventForm />;
};

export default NewEventPage;

// podobnie jak w loaderze, action ma twa natywne parametry, w tym przypadku potrzebny będzie request, bo zawiera on dane z formularza
export async function action({ request, params }) {
  // do odbioru danych potrzebna jest metoda formData
  const data = await request.formData();

  // data.get('x') pobiera konkretną wartość z inputa, gdzie x to name w inpucie
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if(!response.ok){
    throw json({message: 'Could not save event.'},{status: 500})
  } 
//   przeniesienie do events po submicie
  return redirect('/events')
}
