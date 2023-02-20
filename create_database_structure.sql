-- use master
-- go
-- alter database [MyDatbase] set single_user with rollback immediate

-- drop database [MyDatabase]
--go

IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'mini_linq')
  BEGIN
    CREATE DATABASE mini_linq
  END
GO
  USE mini_linq
GO


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='words' and xtype='U')
BEGIN
    CREATE TABLE words (
        Id INT PRIMARY KEY IDENTITY (1, 1),
        name VARCHAR(100) UNIQUE
    )
END
GO

-- users
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
BEGIN
    CREATE TABLE users (
        Id INT PRIMARY KEY IDENTITY (1, 1),
        [name] VARCHAR(25) UNIQUE,
		email VARCHAR(100) UNIQUE,
		[password] VARCHAR(40)
    )
END

GO

-- user words
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='user_words' and xtype='U')
BEGIN
    CREATE TABLE user_words (
        Id INT PRIMARY KEY IDENTITY (1, 1),
        wordId INT,
		userId INT
    )

	ALTER TABLE dbo.user_words
			ADD CONSTRAINT uq_user_words UNIQUE(wordId, userId);
END

GO
-- translations
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='translations' and xtype='U')
BEGIN
    CREATE TABLE translations (
        Id INT PRIMARY KEY IDENTITY (1, 1),
        wordId INT NOT NULL,
		translation VARCHAR(30)
    )

	ALTER TABLE dbo.translations
			ADD CONSTRAINT uq_translations UNIQUE(wordId, translation);
END

GO

-- examples
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='examples' and xtype='U')
BEGIN
    CREATE TABLE examples (
        Id INT PRIMARY KEY IDENTITY (1, 1),
        translationId INT,
		    examle VARCHAR(255)
    )

END

GO

-- user files
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='user_files' and xtype='U')
BEGIN
    CREATE TABLE user_files (
        Id INT PRIMARY KEY IDENTITY (1, 1),
        userId INT,
		    fileUUID VARCHAR(55) UNIQUE, 
    )

END

GO

ALTER TABLE dbo.user_words
   ADD CONSTRAINT FK_UserWords_Words FOREIGN KEY (wordId)
      REFERENCES dbo.words (Id)

GO


ALTER TABLE dbo.user_files
   ADD CONSTRAINT FK_UserFiles_Users FOREIGN KEY (userId)
      REFERENCES dbo.users (Id)

GO

ALTER TABLE dbo.examples
   ADD CONSTRAINT FK_Examples_Translations FOREIGN KEY (translationId)
      REFERENCES dbo.translations (Id)

GO
-- ALTER TABLE user_words
-- 	DROP CONSTRAINT FK_UserWords_Words

-- ALTER TABLE word_translations
-- 	DROP CONSTRAINT  FK_UserWords_Translations

-- Prawdopodobnie nie potrzebne
-- IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='word_translations' and xtype='U')
-- BEGIN
--     CREATE TABLE word_translations (
--         Id INT PRIMARY KEY IDENTITY (1, 1),
--         wordId INT,
-- 		translationId INT,
--     )

-- 	ALTER TABLE dbo.word_translations
-- 			ADD CONSTRAINT uq_word_translations UNIQUE(wordId, translationId);
-- END