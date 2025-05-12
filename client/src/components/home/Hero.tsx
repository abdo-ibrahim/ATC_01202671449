import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Hero = ({ query, setQuery }: { query: string; setQuery: (value: string) => void }) => {
  return (
    <div className="px-4 py-8 min-h-[450px] bg-linear-to-r from-[#A855F7] to-[#3D81F6] flex items-center justify-center relative">
      <div className="container flex flex-col items-center justify-center h-full">
        <div className="content text-white">
          <h1 className="text-[2rem] md:text-[3rem] mb-2 max-w-[800px] text-center">Discover and Book Amazing Events</h1>
          <p className="text-[1.25rem] text-center max-w-[700px]">Find the perfect events for you, from concerts and conferences to workshops and more.</p>
          <div className="search-filter bg-white rounded-lg shadow-md p-4 mt-8">
            <form className="flex items-center justify-center gap-2">
              <Input type="text" placeholder="Search for events..." className="py-4 focus:border-none text-primary" onChange={(e) => setQuery(e.target.value)} value={query} />
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
