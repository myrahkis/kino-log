/* eslint-disable react/prop-types */
import styles from "../pages/_homeList.module.scss";

function PagesNav({ page, setPage, maxPages }) {
  function prevClickHandle() {
    if (page - 1 > 0) {
      setPage(() => page - 1);
    }
  }
  function nextClickHandle() {
    if (page < maxPages) {
      setPage(() => page + 1);
    }
  }

  return (
    <div className={styles["btns-wrapper"]}>
      {page !== 1 && (
        <button className={styles["top-btn"]} onClick={prevClickHandle}>
          <span>
            <svg
              baseProfile="tiny"
              height="24px"
              id="Layer_1"
              version="1.2"
              viewBox="0 0 24 24"
              width="24px"
              fill="#bca5af"
            >
              <g>
                <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
              </g>
            </svg>
          </span>
          Назад
        </button>
      )}
      <h3>
        {page > 1 ? (
          <>
            {page > 2 && (
              <button
                className={styles["top-btn__pages"]}
                onClick={() => setPage(1)}
              >
                1,{" "}
              </button>
            )}
            <button
              className={styles["top-btn__pages"]}
              onClick={() => setPage(page - 1)}
            >
              {page - 1},
            </button>
            {page !== maxPages && (
              <button
                className={`${styles["top-btn__pages"]} ${styles["active"]}`}
              >
                {page}
              </button>
            )}
          </>
        ) : (
          <button className={`${styles["top-btn__pages"]} ${styles["active"]}`}>
            {page}
          </button>
        )}{" "}
        ...{" "}
        <button
          className={`${styles["top-btn__pages"]} ${
            page === maxPages && styles["active"]
          }`}
          onClick={() => setPage(maxPages)}
        >
          {maxPages}
        </button>
      </h3>
      {page !== maxPages && (
        <button className={styles["top-btn"]} onClick={nextClickHandle}>
          Вперёд
          <span>
            <svg
              baseProfile="tiny"
              height="24px"
              id="Layer_1"
              version="1.2"
              viewBox="0 0 24 24"
              width="24px"
              fill="#bca5af"
            >
              <g>
                <path d="M4,19.999c-0.096,0-0.191-0.015-0.286-0.042C3.29,19.831,3,19.441,3,18.999v-1c0-4.8,3.381-8.864,8-9.796V6.499   c0-0.534,0.208-1.036,0.585-1.414c0.756-0.757,2.075-0.756,2.829-0.001l6.288,6.203C20.893,11.475,21,11.73,21,11.999   s-0.107,0.524-0.298,0.712l-6.293,6.207c-0.746,0.746-2.067,0.751-2.823-0.005C11.208,18.535,11,18.033,11,17.499v-1.437   c-2.495,0.201-4.523,0.985-6.164,3.484C4.646,19.834,4.331,19.999,4,19.999z M12,14.01c0.262,0,1-0.01,1-0.01v3.499l5.576-5.5   L13,6.503V10c0,0-0.384-0.004-0.891,0.052c-3.416,0.378-6.125,2.864-6.892,6.08C7.338,14.404,9.768,14.066,12,14.01z" />
              </g>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

export default PagesNav;
