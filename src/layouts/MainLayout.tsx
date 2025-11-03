import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
