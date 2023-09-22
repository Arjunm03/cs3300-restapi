# cs3300-restapi
To use this, run the command 'node server.js' to start the server
Then to test, run 'node script.js'. Note running this multiple times on the same server will result in 404 not found status since the last api call in the script deletes items from the server data.
To test manually, make sure server.js is running then make calls using Postman. The server is running on port 4000 so you should be able to make api calls using the url 'http://localhost:4000/...'.