An example demonstrating how to use [Travis CI](https://travis-ci.org/) to test
with a database and deploy to [Heroku](https://www.heroku.com/).

## Local Database Setup

```sh
sudo -u postgres psql -c "CREATE DATABASE licenses;"
sudo -u postgres psql -c "CREATE USER licenses WITH PASSWORD 'licenses';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE licenses TO licenses;"
```
