import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetails, setUserDetails } from "./store/UserSlice";
import './App.css'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await fetchUserDetails();
      dispatch(setUserDetails(user));
    };

    fetchUserData();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-120px)] mt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
