import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Recipe from "./Components/Recipe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailRecipe from "./Components/Detail";
import { Routes, Route } from "react-router-dom";
import ShoppingList from "./Components/ShoppingList";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Recipe />} />
          <Route path="/shop" element={<ShoppingList />} />
        </Routes>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
