const express = require("express");
const genres = require("./routes/genres");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listining on port ${port}....`));
