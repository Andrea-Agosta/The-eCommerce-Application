import app from './app';
const port = 8080;

app.listen(port, (): void => {
  console.log(`Bazar app listening on port ${port}`);
});