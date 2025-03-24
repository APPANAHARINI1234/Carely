import  {userLoginContext} from "../../contexts/userLoginContext"

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, userLoginStatus, err } = useContext(userLoginContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function userLogin(userCred) {
    loginUser(userCred);
  }

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate("/");
    }
  }, [userLoginStatus]);

  return (
    <form className="auth-form" onSubmit={handleSubmit(userLogin)}>
      <h3 className="text-center fs-4">Login</h3>
      {err.length !== 0 && <p className="error text-center text-danger">{err}</p>}
      <div>
        <label>Username</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <span className="error">*This field is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span className="error">*This field is required</span>}
      </div>
      <button type="submit" className="btn">Login</button>
    </form>
  );
}

export default Login;