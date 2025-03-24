import { userLoginContext } from "./userLoginContext";
import { useState, useEffect } from "react";

function UserLoginStore({ children }) {
  let [currentUser, setCurrentUser] = useState(null);
  let [userLoginStatus, setUserLoginStatus] = useState(false);
  let [err, setErr] = useState("");

  // Check for session on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setUserLoginStatus(true);
    }
  }, []);

  async function loginUser(userCred) {
    try {
      let res = await fetch(`http://localhost:5000/user-api/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userCred),
      });
      let result = await res.json();
      console.log(result);

      if (result.message === "login success") {
        setCurrentUser(result.user);
        setUserLoginStatus(true);
        setErr("");

        // Save user and token in session storage
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("user", JSON.stringify(result.user));
      } else {
        setErr(result.message);
        setCurrentUser(null);
        setUserLoginStatus(false);
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  function logoutUser() {
    setCurrentUser(null);
    setUserLoginStatus(false);
    setErr("");

    // Remove from session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  return (
    <userLoginContext.Provider
      value={{
        loginUser,
        logoutUser,
        userLoginStatus,
        err,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;
