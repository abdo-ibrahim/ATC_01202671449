import EventSection from "@/components/home/EventSection";
import Hero from "@/components/home/Hero";
import { useEvents } from "@/hooks/useEvents";
import { useEffect, useState } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const { events, loading } = useEvents();
  const filteredEvents = query === "" ? events : events.filter((event) => event.name.toLowerCase().includes(query.toLowerCase()) || event.description.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="home">
      <Hero query={query} setQuery={setQuery} />
      <EventSection events={filteredEvents} loading={loading} />
    </div>
  );
};

export default Home;
