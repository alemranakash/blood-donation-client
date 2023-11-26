import Navbar from "../../Components/Navbar";
import Banner from "./Components/Banner";
import ContactUs from "./Components/ContactUs";
import Featured from "./Components/Featured/Featured";
import Footer from "./Components/Footer";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;