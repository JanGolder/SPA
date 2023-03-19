import {Link, useSubmit} from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {

  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');
    if(proceed){
      // hook usesubmit przejmuje data z submita, pierwszy argument to data z Form, jaki chcemy submitować (tutaj niepotrzebny bo usuwamy event), który jest automatycznie owijany w formData() tak jak w NewEvent; drugi argument umożliwia ustawienie takich samych wartości jak w formularzu (method, action), wartości te są przechwytywane w request w EventDetail action
      submit(null, {method:'delete'});
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
