// src/components/EventList.js
import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetchEvents();
  }, [page, limit]);

  // Function to fetch events
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/events", {
        params: { search, page, limit },
      });
      setEvents(response.data || []); 
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setPage(1); 
    fetchEvents(); 
  };

  // Handle items per page change
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); 
  };

  // Handle next page
  const handleNextPage = () => {
    if (events.length === limit) {
      setPage(page + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>

      {/* Search Input and Button */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label className="mr-2">Items per page:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="p-2 border rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={events.length < limit} 
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>

        <div>Page {page}</div>
      </div>
    </div>
  );
};

export default EventList;
