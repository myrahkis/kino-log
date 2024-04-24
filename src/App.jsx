import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Router from "./utils/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <Router searchQuery={query} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
