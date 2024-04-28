/* eslint-disable react/prop-types */
import styles from "./_watchedList.module.scss";

const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

function WatchedList({ watchedList, onDelete }) {
  const listLength = watchedList.length;

  return (
    <>
      {listLength !== 0 ? (
        <ul className={styles["list"]}>
          {watchedList.map((film) => (
            <Card key={film.id} film={film} onDelete={onDelete} />
          ))}
        </ul>
      ) : (
        <h1>Вы еще не добавляли фильмы в &quot;Просмотренное&quot;.</h1>
      )}
    </>
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
        <h3 className={styles["card__info__title"]}>{film.title}</h3>
        <p>{film.release_date.slice(0, 4)}</p>
        <button
          className={styles["card__info__delete-btn"]}
          onClick={() => onDelete(film.id)}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default WatchedList;
