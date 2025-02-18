import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
    </Routes>
  );
};
