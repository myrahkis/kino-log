/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styles from "./_detailsPage.module.scss";

const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

function Details({ selected, setSelected }) {
  const location = useLocation();
  const data = location.state.data;

  function clickHandle(film) {
    setSelected(film);
  }

  return (
    <div className={styles["container"]}>
      <ul className={styles["list"]}>
        {data?.map((film) => (
          <li className={styles['preview']} key={film.id} onClick={() => clickHandle(film)}>
            <img
            className={styles['preview__poster']}
              src={
                film.poster_path
                  ? `${POSTER_PATH}${film.poster_path}`
                  : "image_not_available.png"
              }
              alt="Не удалось загрузить постер."
            />
            <p className={styles['preview__title']}>{film.title}</p>
          </li>
        ))}
      </ul>
      <div className={styles["card"]}>
        <img
        className={styles['card__poster']}
          src={
            selected?.poster_path
              ? `${POSTER_PATH}${selected?.poster_path}`
              : "image_not_available.png"
          }
          alt="Не удалось загрузить постер."
        />
        <h3>{selected?.title}</h3>
      </div>
    </div>
  );
}

export default Details;
