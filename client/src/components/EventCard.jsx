// src/components/EventCard.js
import { useState } from "react";
import api from "../services/api";

const EventCard = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [attendees, setAttendees] = useState([]); 
  const [showAttendees, setShowAttendees] = useState(false); 

  // Handle event registration
  const handleRegister = async () => {
    try {
      const response = await api.post(`/events/${event._id}/register`);
      alert("Registered for the event successfully!");
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering for the event:", error);

      if (error.response && error.response.status === 400) {
        alert("You have already registered for this event.");
        setIsRegistered(true);
      } else if (error.response && error.response.status === 401) {
        alert("You are not authorized. Please log in.");
      } else {
        alert("Failed to register for the event. Please try again.");
      }
    }
  };

  // Fetch attendees for the event
  const fetchAttendees = async () => {
    try {
      const response = await api.get(`/events/${event._id}/attendees`);
      setAttendees(response.data); // Set the attendees state
      setShowAttendees(true); // Show the attendees modal
    } catch (error) {
      console.error("Error fetching attendees:", error);
      alert("Failed to fetch attendees. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">Location: {event.location}</p>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        disabled={isRegistered}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mr-2"
      >
        {isRegistered ? "Registered" : "Register"}
      </button>

      {/* Fetch Attendees Button */}
      <button
        onClick={fetchAttendees}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        View Attendees
      </button>

      {/* Attendees Modal */}
      {showAttendees && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Attendees for {event.title}</h3>
            <ul>
              {attendees.map((attendee, index) => (
                <li key={index} className="text-gray-700 mb-2">
                  {attendee.name} ({attendee.email})
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAttendees(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;