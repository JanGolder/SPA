// za pomocą hooka useRouteError przechwytywana jest wartość error

import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong!";

// w tym przypadku error.status został sztucznie nadpisany w komponencie Events
  if (error.status === 500) {
// konieczne przerobienie danych z json na object, ale dzięki json w Events, jest już dostarczony gotowy format object
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
