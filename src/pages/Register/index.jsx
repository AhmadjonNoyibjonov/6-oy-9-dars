import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  function validate(username, email, password, rePassword) {
    if (username.current.value.length < 3) {
      alert("Username must be at least 3 characters long");
      username.current.focus();
      username.current.style.outlineColor = "red";

      return false;
    }

    if (email.current.value.length < 3) {
      alert("Email must be at least 3 characters long");
      email.current.focus();
      email.current.style.outlineColor = "red";

      return false;
    }

    if (password.current.value.length < 3) {
      alert("Password must be at least 3 characters long");
      password.current.focus();
      password.current.style.outlineColor = "red";

      return false;
    }

    if (password.current.value != rePassword.current.value) {
      alert("Password and rePassword is not the same");
      password.current.value = "";
      password.current.focus();

      return false;
    }

    return true;
  }

  function handleClick(event) {
    event.preventDefault();
    const isValid = validate(usernameRef, emailRef, passwordRef, rePasswordRef);
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((reps) => reps.json())
      .then((data) => {
        if (data.message == "User registered successfully!") {
          navigate("/login");
        }

        if (data.message == "Failed! Username is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.value = "";
          return;
        }

        if (data.message == "Failed! Email is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.value = "";
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2>
          {" "}
          User registration{" "}
          <Link className={styles.link} to="/login">
            LOGIN
          </Link>
        </h2>
        <input ref={usernameRef} type="text" placeholder="Enter username..." />
        <input ref={emailRef} type="email" placeholder="Enter email..." />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password..."
        />
        <input
          ref={rePasswordRef}
          type="password"
          placeholder="Replay password..."
        />
        {
          loading && <button disabled>Loading...</button>
        }
        {
          !loading && <button onClick={handleClick}>Register</button>
        }
        
      </form>
    </div>
  );
}

export default Register;
