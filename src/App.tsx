import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { Footer } from "./functions/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
