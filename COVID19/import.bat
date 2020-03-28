SET URI=mongodb+srv://m001-student:m001-mongodb-basics@cluster0-x4imz.mongodb.net/test
SET COLLECTION=covid19


FOR %%f in (data\*.csv) do (
  mongoimport --uri %URI% --collection %COLLECTION% --headerline --type csv %%f
 @echo %%f
)
 