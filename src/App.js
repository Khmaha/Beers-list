import "./App.scss";
import Header from "./components/commun/Header/Header";
import Footer from "./components/commun/Footer/Footer";
import GetRoutes from "./routes";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <GetRoutes></GetRoutes>
      <Footer></Footer>
    </div>
  );
}

export default App;
