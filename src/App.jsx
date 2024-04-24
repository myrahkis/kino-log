import "./App.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const KEY = "1e11912acc74b0709e04f81e2455dc84";

// работает только с VPN :c
async function fetchAge() {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/11?api_key=${KEY}`
    // {
    //   signal,
    // }
  );

  return data.belongs_to_collection.name;
}

function App() {
  const { data, isLoading, isError } = useQuery(
    ["film"],
    () => fetchAge()
    // {
    //   enabled: false,
    // }
  );

  console.log(data);

  return <div>{data}</div>;
}

export default App;
