import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootEvents from "./pages/RootEvents";
import ErrorPage from "./pages/Error";
// loader przeniesiony do komponentu gdzie dane są potrzebne dla lepszej przejrzystości, tutaj import funkcji z loadera
import EventsPage, { loader as eventsLoader } from "./pages/Events";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // ErrorPage będzie wyświetlał się na każdym poziomie root, ponieważ nie ma zadeklarowanych innych errorElemens niżej w strukturze
      errorElement: <ErrorPage/>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <RootEvents />,
          children: [
            // loader wszystko co zostanie zwrócone w funkcji przekazuje do elementu (komponentu), można przekazać każdy rodzaj danych
            { index: true, element: <EventsPage />, loader: eventsLoader},
            { path: ":eventid", element: <EventDetailPage /> },
            { path: "new", element: <NewEventPage /> },
            { path: ":eventid/edit", element: <EditEventPage /> },
          ],
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
