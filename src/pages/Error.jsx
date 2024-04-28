function Error() {
  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  return (
    <div style={styles}>
      <h1>404</h1>
      <h3>Страница не найдена</h3>
      <p>Неправильно набран адрес страницы или такой страницы не существует</p>
    </div>
  );
}

export default Error;
