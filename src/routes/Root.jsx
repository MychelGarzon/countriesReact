import { Outlet } from "react-router-dom";
import Header from "../components/Header";

//  The Root component is the main component that renders the Header and the Outlet.
function Root() {
    return (<div>
        <Header />
        <Outlet />
    </div>);
}

export default Root;