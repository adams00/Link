-- ADD_USER dbo.users

-- ADD_FILE dbo.user_files

-- ADD_WORD dbo.words dbo.user_words

-- ADD_TRANSLATIONS dbo.word_translations dbo.translations

-- ADD_EXAMPLES dbo.examples

-- DELETE_USER_WORD

-- get get get get get get get :




-- (po MVP) DELETE_USER_FILE (musi zwracać uuid żeby to potem wywalić z plików

-- Resztę bardziej skomplikowanych dodać jak po tym powstanie "Minimum Viable Product"

USE mini_linq;

GO

CREATE OR ALTER PROCEDURE usp_add_user  @name VARCHAR(25), @email VARCHAR(100), @password VARCHAR(40)
AS
BEGIN
	INSERT INTO dbo.users ([name], email, password)
	SELECT @name, @email, @password
END

GO

CREATE OR ALTER PROCEDURE usp_add_file @userId INT, @fileUUID VARCHAR(55)
AS
BEGIN
	INSERT INTO dbo.user_files (userId, fileUUID)
	SELECT @userId, @fileUUID
END

GO

CREATE OR ALTER PROCEDURE usp_add_word @userId INT, @name VARCHAR(100)
AS
BEGIN
	INSERT INTO dbo.words ([name])
	SELECT @name

	INSERT INTO dbo.user_words (wordId, userId)
	SELECT SCOPE_IDENTITY(), @userId
END

GO


CREATE OR ALTER PROCEDURE usp_check_word @name VARCHAR(100)
AS
BEGIN
SELECT COUNT(*)
FROM [mini_linq].[dbo].[words]
WHERE [name] = @name
END

GO

CREATE OR ALTER PROCEDURE usp_add_translation @word VARCHAR(100), @translation VARCHAR(100)
AS
BEGIN
	DECLARE @wordId INT = (
		SELECT w.id
		FROM dbo.words w
		WHERE w.[name] = @word
	)
	INSERT INTO dbo.translations (wordId, translation)
	SELECT @wordId, @translation
END

GO

CREATE OR ALTER PROCEDURE usp_get_translations @wordName NVARCHAR(100)
AS
BEGIN
	SELECT t.translation
	FROM dbo.words w
	JOIN dbo.translations t ON w.id = t.wordId
	WHERE w.name = @wordName
END

CREATE OR ALTER PROCEDURE usp_add_example @translation VARCHAR(100), @example VARCHAR(100)
AS
BEGIN
	DECLARE @translationId INT = (
		SELECT w.id
		FROM dbo.translations t
		WHERE t.translation = @translation
	)
	INSERT INTO dbo.examples (translationId, example)
	SELECT @translationId, @example
END

CREATE OR ALTER PROCEDURE usp_get_examples @translation NVARCHAR(100)
AS
BEGIN
	SELECT e.example
	FROM dbo.examples e
	JOIN dbo.translations t ON e.translationId = t.id
	WHERE t.translation = @translation
END