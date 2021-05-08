import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

export default function Search(props) {
  const [text, setValue] = useState("");
  const [value] = useDebounce(text, 500);

  const onInput = ({ target: { value } }) => {
    setValue(value);
  };
  console.log("hello");
  const triggerSearch = (value) => {
    console.log(value);

    const url = `http://localhost:8000/${props.str}`;
    const json = { query: value };

    axios
      .post(url, json)
      .then((res) => {
        props.set(res.data.msg);
        console.log(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // running delay
  useEffect(() => {
    triggerSearch(value);
  }, [value]);

  return (
    <input
      className="search"
      type="text"
      value={text}
      onChange={onInput}
      placeholder={props.placeholder}
    ></input>
  );
}
