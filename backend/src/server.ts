const {app, port } = require("./app.ts");

app.listen(port, () => {
	console.log(`Listening on ${port}...`)
});
