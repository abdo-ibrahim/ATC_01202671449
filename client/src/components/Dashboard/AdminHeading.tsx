import { BiCategory } from "react-icons/bi";
import AddEvent from "./AddEvent";

const AdminHeading = () => {
  return (
    <div className="container">
      <div className="heading flex justify-between items-center mb-12 flex-wrap gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <BiCategory size={26} className="text-primary" />
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          </div>
          <p>Manage all events from this dashboard</p>
        </div>
        <AddEvent/>
      </div>
    </div>
  );
};

export default AdminHeading;
