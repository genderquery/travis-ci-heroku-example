const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
	let { address, port } = server.address();
	if (address === "" || address === "::") {
		address = "localhost";
	}
	console.log(`Listening at http://${address}:${port}`);
});
