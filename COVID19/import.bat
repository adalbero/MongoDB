SET URI=mongodb+srv://m001-student:m001-mongodb-basics@cluster0-x4imz.mongodb.net/test
SET COLLECTION=covid19


FOR %%f in (C:\Projects\Adalbero\COVID-19\csse_covid_19_data\csse_covid_19_daily_reports\*.csv) do (

  mongoimport --uri %URI% --collection %COLLECTION% --headerline --type csv %%f

 @echo %%f
 )
 