Log Collection API
===================

Log is read by the stream and send output to the response

## Requirements
* Node v16 or above
* Unix System to run
* Logs stored in `/var/log` 

## How to run the service

The following steps will run the log-collection-api service on port 8080.
```bash
git clone git@github.com:badaldesai/log-collection-api.git
cd log-collection-api
npm install
npm start
```

## How to use the serice

In order to use this service, you need to send GET request to localhost:8080
Sample Curl request

```bash
GET /logs/{file}?search={keyword}&limit={value}
```



## How to run test

To run the test, you need to run:

```bash
npm run test
```