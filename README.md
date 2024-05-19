# ReadEasy

## Build project on local devices

### I. Install dependencies:
* Make sure that **Node.js** has been installed by running `npm -v`. If not successfully, please checkout https://nodejs.org/en/download to install **Node.js**.
* Run in terminal:
```bash
$ cd ../backend
$ pip install -r requirements.txt
```

### II. Set up backend:
* Create a file named `.env` includes:
```
MYSQL_USER=YOUR_USERNAME
MYSQL_PASSWORD=YOUR_PASSWORD
MYSQL_SERVICE_HOST=localhost
MYSQL_SERVICE_PORT=3306
MYSQL_DATABASE=YOURDB_NAME
```

### III. Run project:

* Run frontend:
```bash
$ cd frontend
$ npm start
```
* Run backend:
```bash
$ cd backend
$ python main.py
```
* When finished, open http://localhost:3000/ to view the website.



