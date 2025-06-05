import AppRoute from "./routes/AppRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <AppRoute></AppRoute>
      <Footer></Footer>
    </div>
  );
}

export default App;
