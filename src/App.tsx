import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
