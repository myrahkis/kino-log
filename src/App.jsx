import "./App.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Router from "./utils/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const KEY = "1e11912acc74b0709e04f81e2455dc84";

// работает только с VPN :c
// async function fetchAge() {
//   const { data } = await axios.get(
//     `https://api.themoviedb.org/3/movie/11?api_key=${KEY}`
//     // {
//     //   signal,
//     // }
//   );

//   return data.belongs_to_collection.name;
// }

function App() {
  const [query, setQuery] = useState("");
  // const { data, isLoading, isError } = useQuery(
  //   ["film"],
  //   () => fetchAge()
  //   // {
  //   //   enabled: false,
  //   // }
  // );

  // console.log(data);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar searchQuery={query} onSearch={setQuery} />
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;
