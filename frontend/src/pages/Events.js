// useLoaderData pobiera dane z loadera (tego najbliższego)
import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // odbiera data z najbliższego loadera (może być na poziomie wywołania loadera lub niżej, ale nigdy wyżej), technicznie funkcja w loaderze zwraca promise (async) ale react zwraca już wartość po promise
  const data = useLoaderData();

  // if(data.isError){
  //     return <p>{data.message}</p>
  // }

  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

// eksport loadera (pierwotnie w app.js, ale dla lepszej przejrzystości funkcja przeniesiona tutaj i wyeksportowana)
export async function loader() {
  // loadery działają po stronie przeglądarki, nie serwera, można więc korzystać tutaj np z localStorage, nie można natomiast wykorzystywać hooków react (dostępne tylko w komponentach)
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //   return {isError: true, message: 'Could not fetch events.'}
    // wersja alternatywna z użyciem throw - przy użyciu throw errorElement przechwytuje wartość Error i wyświetla komponent, message w formacie json, zasadne jest dodanie warunku if response.status === okreslony status to przekazujemy konkretną wartość
    // if (response.status === 500) {
    // dzięki json można zapisać to w wersji skróconej bez zmany na format json manualnie
    //   throw new Response(
    //     JSON.stringify({ message: "Could not fetch events." }),
    //     {
    //       status: 500,
    //     }
    //   );
    throw json({ message: "Could not fetch events" }, { status: 500 });
    // }
  } else {
    //   konstruktor Response jest w przeglądarce, zawsze jak jest zwracany w loaderze, react router wyciąga z niego dane, kiedy używa useLoaderData, nie trzeba więc wydobywać danych poprzez 'const resData = await response.json();', można te dane przekazać od razu
    //   const res = new Response('any data', {status: 201});

    //   może zostać zwrócony każdy typ danych
    return response;
  }
}
