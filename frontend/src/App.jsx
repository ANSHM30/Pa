import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
// function App() {
//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
//       <h1 className="text-5xl font-bold text-white">
//         🚀 Tailwind is Working!
//       </h1>
//     </div>
//   )
// }

export default App;
