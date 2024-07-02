# Abiza Dashboard
A web application that provides overall stats of the homestay business like monthly income, booking frequency, computation of shares between the host/manager and the owner etc.. 

## To run the application
1. Ensure that your system has Node JS installed
2. Install Docker and PM2 for the backend
3. Clone these repositories
```
https://github.com/onmondo/abiza-dashboard
https://github.com/onmondo/abiza-booking-summary-api
https://github.com/onmondo/abiza-booking-reports-api
https://github.com/onmondo/abiza-shares-api
```
4. Install all dependencies to each project
```
npm i
```
5. Go to `abiza-booking-summary-api` directory and issue the following command
```
make start
```

6. Go to `abiza-dashboard` and create a new `.env` file and add these variables
```
DEV_BOOKING_API_URL=http://localhost:3000
DEV_SHARES_API_URL=http://localhost:3001
```

7. And finally run the web app by issuing these command
```
npm run dev
```

## Other commands
8. You may restart the web services by issuing these commands
```
make stop
make start
```