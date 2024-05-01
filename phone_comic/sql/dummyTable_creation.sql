-- CREATE DATABASE PhoneComicDatabase
-- GO
-- USE PhoneComicDatabase
-- GO
-- CREATE SCHEMA TestAppSchema
-- GO

DROP TABLE TestAppSchema.UserAccount;

CREATE TABLE TestAppSchema.UserAccount(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(18) UNIQUE,
    PasswordHash CHAR(64),
    PasswordSalt CHAR(16),
    Member BINARY,
    RegisterDate DATE,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    LastChapterRead INT,
    LastPageRead INT,
    Email NVARCHAR(50)
);

-- subscription table

-- Chapter Table - chapterId, chapterNumber, title, releaseDate, numPages, path

-- Page Table - pageId, chapterId, pageNumber, customSize, path

INSERT INTO TestAppSchema.UserAccount (UserName, PasswordHash, Member, RegisterDate, FirstName, LastName, LastChapterRead, LastPageRead) VALUES ('FisherM', 'password', 1, '2024-04-28', 'Frank', 'Cheng', 15, 2);
INSERT INTO TestAppSchema.UserAccount (UserName, PasswordHash, Member, RegisterDate, FirstName, LastName, LastChapterRead, LastPageRead) VALUES ('SexiMuffin', 'password2', 1, '2024-04-27', 'Christian', 'Rayos', 16, 4);
INSERT INTO TestAppSchema.UserAccount (UserName, PasswordHash, Member, RegisterDate, FirstName, LastName, LastChapterRead, LastPageRead) VALUES ('NgSerenity', 'password3', 1, '2024-04-26', 'Todd', 'Ogaki', 15, 6);
INSERT INTO TestAppSchema.UserAccount (UserName, PasswordHash, Member, RegisterDate, FirstName, LastName, LastChapterRead, LastPageRead) VALUES ('Enjoy8', 'password4', 1, '2024-04-25', 'Eric', 'McLeod', 15, 4);
INSERT INTO TestAppSchema.UserAccount (UserName, PasswordHash, Member, RegisterDate, FirstName, LastName, LastChapterRead, LastPageRead) VALUES ('HaroMaia', 'password5', 1, '2024-04-24', 'Mylyne', 'Mapanao', 16, 12);


INSERT INTO TestAppSchema.UserAccount VALUES ('DucknCover', 'password6', 'aaa', 1, '2024-04-23', 'Vince', 'Sanyoto', 16, 13, 'vincesan@hotmail.com');

DELETE FROM TestAppSchema.UserAccount WHERE UserName = 'DucknCover';

SELECT * FROM TestAppSchema.UserAccount;

ALTER TABLE TestAppSchema.UserAccount
ALTER COLUMN Password CHAR(64);

EXEC sp_rename 'TestAppSchema.UserAccount.Password', 'PasswordHash', 'COLUMN';

ALTER TABLE TestAppSchema.UserAccount
ADD Email NVARCHAR(50);


