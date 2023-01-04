import app from './app';
const port = 8080;

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});