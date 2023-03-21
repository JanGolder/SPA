// Form umożliwia wysyłkę data przez action, pomimo method="post" nie będzie wysłane od razu do backend ale do action
// useNavigation przejmuje informację o submicie - m.in. data + status;
// useActionData daje dostęp do danych zwróconych z action (najbliższego);
// funkcja redirect przekierowuje na konkretny route wskazany jako parametr
import { useNavigate, Form, useNavigation, useActionData, json, redirect} from "react-router-dom";


import classes from "./EventForm.module.css";

function EventForm({ method, event }) {

  // zwraca data ustawione w backend jako validation errors (events.js w routes)
const data = useActionData();

  const navigate = useNavigate();

  // useNavigation zwraca obiekt, który można wykorzystać do odczytu data lub status
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate("..");
  }

  return (
    // dzięki metodzie podane w params i wykorzystanej w Form mamy do niej dostęp w action (w request)
    <Form method={method} className={classes.form}>
      {/* zwraca wszytskie występujące błędy z backend */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err)=>(
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        {/* wykorzystanie status w useNavigation do disabled i text buttona */}
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;



// podobnie jak w loaderze, action ma twa natywne parametry, w tym przypadku potrzebny będzie request, bo zawiera on dane z formularza
export async function action({ request, params }) {

  // pobieranie metody z Form (przekazana jako props)
  const method = request.method;
  // do odbioru danych potrzebna jest metoda formData
  const data = await request.formData();

  // data.get('x') pobiera konkretną wartość z inputa, gdzie x to name w inpucie
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

// w przypadku metody post url będzie uniwersalny (poniżej)
let url = "http://localhost:8080/events";

// w przypadku metody patch do url trzeba dodać id edytowanego eventu 
if(method === 'PATCH'){
  const eventId = params.eventid;
  url = "http://localhost:8080/events/" + eventId;
}

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // 422 to odpowiedz z backend, zwraca response (będzie wykorzystywane jako walidacja w formularzu)
if(response.status === 422){
  return response
}


  if(!response.ok){
    throw json({message: 'Could not save event.'},{status: 500})
  } 
//   przeniesienie do events po submicie
  return redirect('/events')
}
