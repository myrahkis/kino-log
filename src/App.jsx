import Navbar from "./components/Navbar";
import { useState } from "react";
import Router from "./utils/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchList from "./pages/SearchList";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar searchQuery={query} onSearch={setQuery} />
        {query === "" ? (
          <Router searchQuery={query} selected={selected} setSelected={setSelected}/>
        ) : (
          <SearchList query={query} setSearch={setQuery} setSelected={setSelected}/>
        )}
      </div>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
