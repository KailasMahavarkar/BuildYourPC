const axios = require("axios");

export const fetchRAM = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchRAM");
  const items = await data.json();
  return items;
};
export const fetchProcessor = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchProcessor");
  const items = await data.json();
  return items;
};
export const fetchMotherboard = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchMotherboard");
  const items = await data.json();
  return items;
};
export const fetchPowersupply = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchPowersupply");
  const items = await data.json();
  return items;
};
export const fetchSSD = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchSSD");
  const items = await data.json();
  return items;
};
export const fetchGPU = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchGPU");
  const items = await data.json();
  return items;
};
export const fetchMONITOR = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchMONITOR");
  const items = await data.json();
  return items;
};
export const fetchCABINETS = async () => {
  const data = await fetch("http://127.0.0.1:8000/fetchCABINET");
  const items = await data.json();
  return items;
};
export function LOGIN(e, setmodal, setCookie, removeCookie) {
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/login",
    data: e,
    withCredentials: false,
    header: {
      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8;application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setCookie("login_Data", {
          login: true,
          email: JSON.parse(response.config.data).email,
        });
        setmodal(false);
        alert("Login Successfull");
      } else {
        alert("Login Not Successfull");
      }
    })
    .catch((error) => {
      const errorStatus = JSON.parse(error.request.status);
      const errorData = JSON.parse(error.request.response);
      console.log(errorStatus);
      console.log(errorData);
      alert("Invalid Credientials");
    });
}
export const REGISTER = async (e, setLR) => {
  console.log(e);
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/register",
    data: e,
    withCredentials: false,
    header: {
      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8;application/json",
    },
  })
    .then((response) => {
      const resStatus = response.status;
      const resData = response.data;
      console.log(resStatus);
      console.log(resData);
      if (resData.status) {
        alert("Registeration successfull");
        setLR("login");
      }
    })
    .catch((error) => {
      const errorStatus = JSON.parse(error.request.status);
      const errorData = JSON.parse(error.request.response);
      console.log(errorStatus);
      console.log(errorData);
      alert("Error occured while registeration");
    });
};
