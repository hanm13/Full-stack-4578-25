// Adding valid user:


C:\Users\hanm15>curl -v -X POST -H "Content-type: application/json" -d  "{\"age\":15,\"name\":\"John Doe\",\"isMale\":true,\"country\":\"Albania\"}" localhost:4444/api/users
Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 4444 (#0)
> POST /api/users HTTP/1.1
> Host: localhost:4444
> User-Agent: curl/7.55.1
> Accept: */*
> Content-type: application/json
> Content-Length: 62
>
* upload completely sent off: 62 out of 62 bytes
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 23
< ETag: W/"17-ql36Bw2oV6N1OZ0xZYZDU6/AGtU"
< Date: Mon, 15 Oct 2018 08:36:11 GMT
< Connection: keep-alive
<
User addedd to the file* Connection #0 to host localhost left intact

// Adding invalid user(age: 850)

C:\Users\hanm15>curl -v -X POST -H "Content-type: application/json" -d  "{\"age\":850,\"name\":\"John Doe\",\"isMale\":true,\"country\":\"Albania\"}" localhost:4444/api/users
Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 4444 (#0)
> POST /api/users HTTP/1.1
> Host: localhost:4444
> User-Agent: curl/7.55.1
> Accept: */*
> Content-type: application/json
> Content-Length: 63
>
* upload completely sent off: 63 out of 63 bytes
< HTTP/1.1 400 Bad Request
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 28
< ETag: W/"1c-U+pskKPjwFIFabnKTw8j4cmrTCo"
< Date: Mon, 15 Oct 2018 08:37:00 GMT
< Connection: keep-alive
<
Age must be between 0 to 120* Connection #0 to host localhost left intact

// User delete

C:\Users\hanm15>curl -v -X DELETE -H "Content-type: application/json" -d "{\"name\":\"John Doe\"}" localhost:4444/api/users
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 4444 (#0)
> DELETE /api/users HTTP/1.1
> Host: localhost:4444
> User-Agent: curl/7.55.1
> Accept: */*
> Content-type: application/json
> Content-Length: 19
>
* upload completely sent off: 19 out of 19 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 26
< ETag: W/"1a-oXpDtiFWY0jgbk9X+EumP/txS2A"
< Date: Mon, 15 Oct 2018 08:48:21 GMT
< Connection: keep-alive
<
User deleted from the file* Connection #0 to host localhost left intact

// User update

C:\Users\hanm15>curl -v -X PUT -H "Content-type: application/json" -d  "{\"age\":20,\"name\":\"John Doe\",\"isMale\":true,\"country\":\"Albania\"}" localhost:4444/api/users
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 4444 (#0)
> PUT /api/users HTTP/1.1
> Host: localhost:4444
> User-Agent: curl/7.55.1
> Accept: */*
> Content-type: application/json
> Content-Length: 62
>
* upload completely sent off: 62 out of 62 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 23
< ETag: W/"17-4OWW7LQaVU2ur+XwUeNOLgFmFuo"
< Date: Mon, 15 Oct 2018 09:13:26 GMT
< Connection: keep-alive
<
User edited in the file* Connection #0 to host localhost left intact

