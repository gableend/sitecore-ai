import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import AgenticExperience from "./pages/AgenticExperience.tsx";
import AgenticEvents from "./pages/Symposium2025.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/agentic-experience",
    element: <AgenticExperience />,
  },
  {
    path: "/agentic-events",
    element: <AgenticEvents />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(<RouterProvider router={router} />);
