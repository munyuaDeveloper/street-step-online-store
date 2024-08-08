import DashboardGraph from "../components/DashboardGraph";

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between gap-5">
        <div className="bg-amber-200 w-1/4 min-h-[150px] p-3 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center mt-4">Pending Orders</h2>
          <h1 className="text-5xl text-center mt-4 font-bold">349</h1>
        </div>
        <div className="bg-emerald-400 w-1/4 min-h-[150px] p-3 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center mt-4">Completed Orders</h2>
          <h1 className="text-5xl text-center mt-4 font-bold">3,920</h1>
        </div>
        <div className="bg-rose-400 w-1/4 min-h-[150px] p-3 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center mt-4">Canceled Orders</h2>
          <h1 className="text-5xl text-center mt-4 font-bold">102</h1>
        </div>
        <div className="bg-fuchsia-400 w-1/4 min-h-[150px] p-3 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center mt-4">Total Sales</h2>
          <h1 className="text-5xl text-center mt-4 font-bold">
            43,000 <span className="text-lg">Ksh</span>
          </h1>
        </div>
      </div>
      <div>
        <DashboardGraph />
      </div>
    </div>
  );
};

export default Dashboard;
