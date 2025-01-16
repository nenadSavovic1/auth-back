#README 

# Postgres DB

# installation on macOS
```
brew install postgresql
```

# Checking to see if postgres service can start


```
brew services start postgresql
==> Successfully started `postgresql` (label: homebrew.mxcl.postgresql)
```

We need to start te postgres db service by running the command above
When postgres is running, we need to interact with the defafult db user and the default databse, 
We do that bu typing

```
psql postgres
```

Now when postgres is running and we are using psql default user with the default database, we can check the info with this command:
```
postgres=# \conninfo
```

Output:
```
You are connected to database "postgres" as user "nenad" via socket in "/tmp" at port "5432".
```
