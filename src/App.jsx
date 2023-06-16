import { useEffect } from "react";
import RoutesWrapper from "./routes/routes";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  const { token } = useSelector((state) => get(state, "auth"));

  useEffect(() => {
    axios.get("http://api.test.uz/api/v1/admin/user/get-me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/");
    } else {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated]);

  return <RoutesWrapper />;
}

export default App;
