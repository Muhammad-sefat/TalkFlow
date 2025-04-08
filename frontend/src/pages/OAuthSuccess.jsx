// pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");
    console.log(name, email);
    if (token) {
      const userObj = { _id: id, name, email };
      dispatch(
        setUser({
          user: userObj,
          token,
        })
      );
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));
      navigate("/dashboard");
    }
  }, [params, dispatch, navigate]);

  return <p>Logging in with Google...</p>;
};

export default OAuthSuccess;
