/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styles from "./_detailsPage.module.scss";
import SelectedFilmCard from "../components/SelectedFilmCard";

const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

function Details({ selected, setSelected, watchedList, onWatched }) {
  const location = useLocation();
  const data = location.state.data;

  const isWatched = watchedList.map((film) => film.id).includes(selected?.id);

  function clickHandle(film) {
    setSelected(film);
  }

  return (
    <div className={styles["container"]}>
      <ul className={styles["list"]}>
        {data?.map((film) => (
          <li
            className={styles["preview"]}
            key={film.id}
            onClick={() => clickHandle(film)}
          >
            <img
              className={styles["preview__poster"]}
              src={
                film.poster_path
                  ? `${POSTER_PATH}${film.poster_path}`
                  : "image_not_available.png"
              }
              alt="Не удалось загрузить постер."
            />
            <div className={styles["preview__info"]}>
              <h3 className={styles["preview__info__title"]}>{film.title}</h3>
              <p>{film.release_date.slice(0, 4)}</p>
            </div>
          </li>
        ))}
      </ul>
      <SelectedFilmCard
        selected={selected}
        isWatched={isWatched}
        onWatched={onWatched}
      />
    </div>
  );
}

export default Details;
