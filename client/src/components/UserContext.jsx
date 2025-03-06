import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details when the app loads
    const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token"); // Get token from localStorage or state
          if (!token) return;
      
          const res = await axios.get("http://localhost:5000/api/auth/user", {
            headers: { Authorization: `Bearer ${token}` }, // Send token in headers
            withCredentials: true,
          });
      
          setUser(res.data);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
