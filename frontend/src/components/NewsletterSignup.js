// useFetcher zwraca obiekt zawierający wiele metod i wartości m.in. component Form i submit, z tą różnicą, że Form z fetchera nie inicjalizuje route transition (powinien być stosowany zawsze gdy używamy action lub loader i nie chcemy route transition - tj. nie chcemy route changes przy wysyłce request i nie chcemy loading page do której to action lub loader należy - np. dla komponentów używanych wielokrotnie w różnych miejscach na stronie jak w tym przykładzie - zapis do newslettera), można używać go więc zawsze wtedy kiedy chcemy użyć action lub loader bez nawigowania do strony do której należy action lub loader. W tym przypadku używamy newslettera na różnych poziomach routingu, więc klasyczne zastosowanie Form z action nie byłoby optymalne (i zaburzyło strukturę innych action)

import { useEffect } from 'react';
import {useFetcher} from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {

const fetcher = useFetcher();
// data to info o powodzeniu wysyłki, state to status 
const {data, state} = fetcher;

useEffect(()=>{
  if(state === 'idle' && data && data.message){
    window.alert(data.message);
  }
},[data,state])


  return (
    // gdyby Form był bez fetchera ustawienie action spowodowałoby, że po submicie nastąpiłoby przekierowanie do podstrony newsletter
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;