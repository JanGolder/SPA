// useNavigation zwraca wartość z info, czy komponent z loaderem otrzymał już promise (state jako 'idle' (żadnych aktywnych transitions), 'loading' (w trakcie) lub 'submitting'(submitting data))
import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = ()=>{

    const navigation=useNavigation();

    return (
        <>
        <MainNavigation/>
        <main>
            {navigation.state === 'loading' && <p>Loading...</p>}
            <Outlet/>
        </main>
        </>
    )
};

export default RootLayout;