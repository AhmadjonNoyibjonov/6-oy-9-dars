import React, { useRef,useState } from "react";
import styles from "./index.module.css";
import {Link, useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  function validate(username, password) {
    if (username.current.value.length < 3 && username.current.value == '') {
      alert("Username must be at least 3 characters long");
      username.current.focus();
      username.current.style.outlineColor = "red";

      return false;
    }

    if (password.current.value.length < 3 && password.current.value == '') {
      alert("Password must be at least 3 characters long");
      password.current.focus();
      password.current.style.outlineColor = "red";

      return false;
    }
    return true;
  }

  function handleClick(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, passwordRef);
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true)
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "User Not found.") {
          alert(data.message);
          usernameRef.current.focus()
          usernameRef.current.style.outlineColor = 'red'
          return;
        }
        if (data.message == "Invalid Password!") {
          alert(data.message);
          passwordRef.current.focus()
          passwordRef.current.style.outlineColor = 'red'
          return;
        }

        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.accessToken);

          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function() {
        setLoading(false)
      })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h2> User login <Link className={styles.link} to="/register">REGISTER</Link></h2>
          <input ref={usernameRef} type="text" placeholder="Username..." />
          <input ref={passwordRef} type="password" placeholder="Password..." />
          
          {
            loading && <button disabled>Loading...</button>
          }

          {
            !loading && <button onClick={handleClick}>LOGIN</button>
          }
        </form>
      </div>
    </div>
  );
}

export default Login;
