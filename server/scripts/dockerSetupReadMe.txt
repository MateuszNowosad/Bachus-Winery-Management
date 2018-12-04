1. Run bash script with npm run initDatabase
2. Wait till container starts up (approx 40 seconds)
3. docker logs bachus-winery57 | grep GENERATED
4. docker exec -it bachus-winery57 mysql -uroot -p
5. Use password from step 3
6. Inside container write ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
7. CREATE USER 'test'@'%' IDENTIFIED BY 'test';
8. GRANT ALL PRIVILEGES ON *.* TO 'test'@'%' WITH GRANT OPTION;
9. CREATE DATABASE bachusWinery;
10. USE bachusWinery

After step 10 use database client like mycli instead of container console
