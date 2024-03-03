import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Auth } from "./components/Auth";
import { Todo } from "./components/Todo";
import { CalendarPage } from "./components/CalendarPage";
import { AttendancePage } from "./components/AttendancePage";
import { DateDetailPage } from "./components/DateDetailPage";
import axios from "axios";
import { CsrfToken } from "./types";
import { UserContextProvider } from "./contexts/UserContext";
import { User } from "./types";
import { Header2 } from "./components/Header2";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    document.title = "TimeKeeper";
    axios.defaults.withCredentials = true;
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      );
      axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token;
    };
    //getCsrfToken()
  }, []);
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Toaster />
        <UserContextProvider>
          <Header2 />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/clips" element={<Todo />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route
              path="/date/:year/:month/:day"
              element={<DateDetailPage />}
            />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
