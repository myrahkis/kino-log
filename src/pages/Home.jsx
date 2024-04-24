import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const KEY = "1e11912acc74b0709e04f81e2455dc84";

// работает только с VPN :c
async function fetchPopular(signal) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?&api_key=${KEY}`,
    {
      signal,
    }
  );

  return data.results[0].original_title;
}

function Home({ query }) {
  const { data, isLoading, isError } = useQuery(
    ["film"],
    ({ signal }) => fetchPopular(signal)
    // {
    //   enabled: false,
    // }
  );

  console.log(data);
  return (
    <div>
      заглавнвя стр
    </div>
  );
}

export default Home;
