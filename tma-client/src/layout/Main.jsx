import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div className="max-w-9/10 mx-auto px-4">
            <Navbar></Navbar>
            <br />
            <Outlet></Outlet>
            <br />
            <Footer></Footer>
        </div>
    );
};

export default Main;