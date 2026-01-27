import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const AppLayout = () => {
  return (
    <div>
      <Footer /> <Outlet />
    </div>
  );
};

export default AppLayout;
