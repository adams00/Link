-- ADD_USER dbo.users

-- ADD_FILE dbo.user_files

-- ADD_WORD dbo.words dbo.user_words

-- ADD_TRANSLATIONS dbo.word_translations dbo.translations

-- ADD_EXAMPLES dbo.examples

-- DELETE_USER_WORD

-- get get get get get get get :




-- (po MVP) DELETE_USER_FILE (musi zwracać uuid żeby go potem wywalić z plików

-- Resztę bardziej skomplikowanych dodać jak po tym powstanie "Minimum Viable Product"

USE mini_linq;

GO

CREATE PROCEDURE usp_add_user  @name VARCHAR(25), @email VARCHAR(100), @password VARCHAR(40)
AS
BEGIN
	INSERT INTO dbo.users ([name], email, password)
	SELECT @name, @email, @password
END

GO

CREATE PROCEDURE usp_add_file @userId INT, @fileUUID VARCHAR(55)
AS
BEGIN
	INSERT INTO dbo.user_files (userId, fileUUID)
	SELECT @userId, @fileUUID
END

GO

CREATE PROCEDURE usp_add_word @userId INT, @name VARCHAR(100)
AS
BEGIN
	INSERT INTO dbo.words ([name])
	SELECT @name

	INSERT INTO dbo.user_words (wordId, userId)
	SELECT SCOPE_IDENTITY(), @userId
END