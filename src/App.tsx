import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://to-dos-api.softclub.tj/api/to-dos";
const api = "https://to-dos-api.softclub.tj/images/";

function App() {
  const [user, setUser] = useState([]);
  const [searchState, setSearchState] = useState("");
  const inputRef = useRef(null);

  const renders = useRef(0);
  renders.current += 1;

  async function getData() {
    try {
      const { data } = await axios.get(API);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function delUser(id) {
    try {
      await axios.delete(`${API}?id=${id}`);
      await getData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="cnt">
        <h1>{renders.current}</h1>
      </div>
      <br />
      <br />
      <br />

      <input
        type="text"
        placeholder="Input бо useState (re-render мекунад)"
        value={searchState}
        onChange={(e) => setSearchState(e.target.value)}
      />

      <input
        type="text"
        placeholder="Input бо useRef (re-render намекунад)"
        ref={inputRef}
      />

      <div className="div">
        {user.map((elem) => (
          <div className="box" key={elem.id}>
            <div className="imgs">
              {elem.images?.map((img) => (
                <img
                  className="img"
                  key={img.id}
                  src={`${api}${img.imageName}`}
                  width={200}
                />
              ))}
            </div>
            <h1>{elem.name}</h1>
            <button onClick={() => delUser(elem.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;