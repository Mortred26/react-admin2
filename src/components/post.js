import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/post.css";

function Post() {
  const [name, nameChange] = useState("");
  const [surname, surnameChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");

  const data = {
    name,
    surname,
    email,
    phone,
  };

  const navigate = useNavigate();

  const postInfo = (e) => {
    e.preventDefault();

    fetch("https://coffe-backend-txf2.onrender.com/api/v1/product", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Your form is submitted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div class="main">
      <div class="containerPost">
        <img class="register-logo" src="/image/logo.png" alt="logo" />
        <form class="register-main" onSubmit={postInfo}>
          <h1 class="register-name">Let's get to know each other</h1>
          <div class="registerInputDiv">
            <input
              class="register-input"
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => nameChange(e.target.value)}
            />
          </div>
          <div class="registerInputDiv">
            <input
              class="register-input"
              type="text"
              placeholder="Last Name"
              value={surname}
              onChange={(e) => surnameChange(e.target.value)}
            />
          </div>
          <div class="registerInputDiv">
            <input
              class="register-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => emailChange(e.target.value)}
            />
          </div>
          <div class="registerInputDiv">
            <input
              class="register-input"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => phoneChange(e.target.value)}
            />
          </div>
          <button value="submit" class="register-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
