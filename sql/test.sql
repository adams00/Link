IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'mini_linq')
  BEGIN
    CREATE DATABASE mini_linq
  END

GO

USE mini_linq

GO

SELECT * FROM sys.databases WHERE name = 'mini_linq'