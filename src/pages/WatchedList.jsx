/* eslint-disable react/prop-types */
import styles from "./_watchedList.module.scss";

const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

function WatchedList({ watchedList, onDelete }) {
  const isEmpty = watchedList.length;

  console.log(isEmpty);
  return (
    <div>
      <ul className={styles["list"]}>
        {watchedList.map((film) => (
          <Card key={film.id} film={film} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

function Card({ film, onDelete }) {
  return (
    <li className={styles["card"]}>
      <img
        className={styles["card__poster"]}
        src={
          film.poster_path
            ? `${POSTER_PATH}${film.poster_path}`
            : "image_not_available.png"
        }
        alt="Не удалось загрузить постер."
      />
      <div className={styles["card__info"]}>
        <h3 className={styles['card__info__title']}>{film.title}</h3>
        <p>{film.release_date.slice(0, 4)}</p>
        <button onClick={() => onDelete(film.id)}>Удалить</button>
      </div>
    </li>
  );
}

export default WatchedList;
