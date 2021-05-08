import React, { useState } from "react";
import { LOGIN, REGISTER } from "../../apis/functions";
import { useCookies } from "react-cookie";

export default function Modal(props) {
  const [LR, setLR] = useState("login");
  // cookie
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div className="modal">
      <div className="modal__content">
        <span
          onClick={() => props.setmodal(false)}
          className="modal__content--close "
        >
          &times;
        </span>
        <h2 className="modal__content--header colorGold">Please Login</h2>
        <span className="modal__content--text">
          {LR === "login" ? (
            // login
            <form
              onSubmit={(e) => {
                let data = {};
                e.preventDefault();
                data["email"] = e.target["e-mail"].value;
                data["password"] = e.target.password.value;
                LOGIN(data, props.setmodal, setCookie, removeCookie);
              }}
              className="modal__content--login"
              // method="post"
            >
              <label
                htmlFor="e-mail"
                className="colorGold modal__content--login__lable1"
              >
                E-Mail
              </label>
              <input
                type="email"
                name="e-mail"
                id="e-mail"
                className="modal__content--login__input1"
                required
              />
              <label
                htmlFor="password "
                className="colorGold modal__content--login__lable2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="modal__content--login__input2"
                required
              />
              <div className="modal__content--login__button">
                <button className="loadmore">
                  Login →
                </button>
              </div>
            </form>
          ) : (
            // registeration
            <form
              onSubmit={(e) => {
                let data = {};
                e.preventDefault();
                data["email"] = e.target["e-mail"].value;
                data["firstname"] = e.target.first.value;
                data["lastname"] = e.target.last.value;
                data["password"] = e.target.password.value;
                REGISTER(data, setLR);
              }}
              className="modal__content--register"
            >
              <label
                htmlFor="e-mail"
                className="colorWhite modal__content--register__lable1"
              >
                E-Mail
              </label>
              <input
                type="email"
                name="e-mail"
                id="e-mail"
                className="modal__content--register__input1"
                required
              />
              <label
                htmlFor="first "
                className="colorGold modal__content--register__lable2"
              >
                First Name
              </label>
              <input
                type="text"
                name="first"
                id="first"
                className="modal__content--register__input2"
                required
              />
              <label
                htmlFor="last "
                className="colorGold modal__content--register__lable2"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last"
                id="last"
                className="modal__content--register__input2"
                required
              />
              <label
                htmlFor="password "
                className="colorGold modal__content--register__lable2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="modal__content--register__input2"
                required
              />
              <div className="modal__content--register__button">
                <button className="loadmore">
                  Register →
                </button>
              </div>
            </form>
          )}
        </span>

        <div className="colorGold modal__content--button">
          {LR === "login" ? (
            <React.Fragment>
              <h3>Dont Have a Account</h3>
              <button className="loadmore" onClick={() => setLR("register")}>
                Register →
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3>Already Have a Account</h3>
              <button className="loadmore" onClick={() => setLR("login")}>
                Login →
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
