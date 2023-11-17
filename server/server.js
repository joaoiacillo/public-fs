const express = require("express");

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));
app.use("/files", require("./routes/files"));

app.listen(port, () => {
    console.log("[Server] Now listening on", `http://localhost:${port}`);
});
