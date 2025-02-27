// src/pages/Home.js
import EventList from "../components/EventList";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <EventList />
    </div>
  );
};

export default Home;