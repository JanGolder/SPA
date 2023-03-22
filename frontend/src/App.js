import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootEvents from "./pages/RootEvents";
import ErrorPage from "./pages/Error";
// loader przeniesiony do komponentu gdzie dane są potrzebne dla lepszej przejrzystości, tutaj import funkcji z loadera
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import {action as manipulateEventAction} from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // ErrorPage będzie wyświetlał się na każdym poziomie root, ponieważ nie ma zadeklarowanych innych errorElemens niżej w strukturze
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <RootEvents />,
          children: [
            // loader wszystko co zostanie zwrócone w funkcji przekazuje do elementu (komponentu), można przekazać każdy rodzaj danych
            { index: true, element: <EventsPage />, loader: eventsLoader },
            {
              // struktura stworzona tylko po to aby mozna było wykorzystać loadera (i skorzystać z danych głębiej w strukturze - w zagnieżdżonych komponentach - przy edit), dlatego nie wskazano komponentu w element, konieczne jest tutaj wykorzystanie hooka useRouteLoaderData (w komponentach pobierających dane) i parametru id jako identyfikator
              path: ":eventid",
              id: 'event-detail',
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction
                },
                { path: "edit", element: <EditEventPage />, action: manipulateEventAction},
              ],
            },
            { path: "new", element: <NewEventPage />, action: manipulateEventAction },
          ],
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
