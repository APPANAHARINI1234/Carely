import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Register.css"; 

function Register({ onRegisterSuccess }) {  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState("");

  async function onUserRegister(newUser) {
    try {
      let res = await fetch(`https://carely-health-7zfg.onrender.com/user-api/user`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      let data = await res.json();
      
      if (data.message === "user created") {
        onRegisterSuccess();
      } else {
        setErr(data.message);
      }
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit(onUserRegister)}>
        <h2>Sign Up</h2>
        {err.length !== 0 && <p className="error-message">{err}</p>}
        
        <div className="input-group">
          <label>Username</label>
          <input type="text" {...register("username", { required: true, minLength: 4 })} placeholder="Enter your username" />
          {errors.username?.type === 'required' && <span className="error">*Required</span>}
          {errors.username?.type === 'minLength' && <span className="error">*At least 4 characters</span>}
        </div>
        
        <div className="input-group">
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} placeholder="Enter your email" />
          {errors.email && <span className="error">*Required</span>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" {...register("password", { required: true })} placeholder="Enter your password" />
          {errors.password && <span className="error">*Required</span>}
        </div>

        <button type="submit" className="btn">Create Account</button>
        <p className="login-link">Already have an account? <a href="/login">Log In</a></p>
      </form>
    </div>
  );
}

export default Register;
