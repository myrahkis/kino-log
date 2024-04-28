import Navbar from "./components/Navbar";
import { useState } from "react";
import Router from "./utils/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchList from "./pages/SearchList";
import Footer from "./components/Footer";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [watchedList, setWatchedList] = useLocalStorage("watched", []);
  const queryClient = new QueryClient();

  function addToWatchedHandle(film) {
    setWatchedList((watchedList) => [...watchedList, film]);
  }
  function deleteWatchedHandle(id) {
    if (window.confirm("Вы уверены, что хотите убрать фильм из списка?"))
      setWatchedList((watchedList) =>
        watchedList.filter((film) => film.id !== id)
      );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar searchQuery={query} onSearch={setQuery} />
        {query === "" ? (
          <Router
            searchQuery={query}
            selected={selected}
            setSelected={setSelected}
            watchedList={watchedList}
            onWatched={addToWatchedHandle}
            onDelete={deleteWatchedHandle}
          />
        ) : (
          <SearchList
            query={query}
            setSearch={setQuery}
            setSelected={setSelected}
          />
        )}
      </div>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
