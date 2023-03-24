// useLoaderData pobiera dane z loadera (tego najbliższego)
// defer to funkcja, dzięki której mozna opóźniać/ustawiać kiedy dany element ma się wyrenderować, może przyspieszyć działanie strony (szczególnie jeśli na stronie używanych jest wiele http requests)
import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // odbiera data z najbliższego loadera (może być na poziomie wywołania loadera lub niżej, ale nigdy wyżej), technicznie funkcja w loaderze zwraca promise (async) ale react zwraca już wartość po promise
  // const data = useLoaderData();

// wykorzystanie defer (useLoaderData zwraca defer) przy użyciu Await

const {events} = useLoaderData()
return (
  // Suspense może być użyty w niektórych sytuacjach aby pokazać błąd w trakcie ładowania data, tutaj umożliwia pokazanie kontentu w trakcie ładowania listy eventów 
  <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
<Await resolve={events}>
  {(loadedEvents)=><EventsList events={loadedEvents}/>}
</Await>
</Suspense>
)

  // if(data.isError){
  //     return <p>{data.message}</p>
  // }
// bez defer data byłaby wartościami z loadera i renderowała events:
  // const events = data.events;
  // return <EventsList events={events} />;
}

export default EventsPage;

async function loadEvents(){
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
      // return response;
      // z uwagi na użycie defer return musiał zostać zmodyfikowany
      const resData = await response.json();
      return resData.events;
    }
}


// eksport loadera (pierwotnie w app.js, ale dla lepszej przejrzystości funkcja przeniesiona tutaj i wyeksportowana)
export function loader() {
  // zwracamy defer, (cała zawartość pierwotnego loadera przeniesiona do funkcji loadEvents z uwagi na wykorzystanie defer) defer potrzebuje obiektu, nazwa klucza jest dowolna, przekazujemy funkcję z promisem (musi być promise bo nie byłoby co opóźniać), idea defer jest taka że chcemy załadować komponent i go wyświetlić pomimo tego, że nie ma jeszcze załadowanych przyszłych wartości
return defer({
  events: loadEvents()
})
}
