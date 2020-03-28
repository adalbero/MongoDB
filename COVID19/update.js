 //db.covid19.updateMany({Deaths: ''}, { $set: {Deaths: 0}});
 //db.covid19.updateMany({Recovered: ''}, { $set: {Recovered: 0}});
 
// new - 5e7e1f4fcf76b2cfe56ac961
// old - 5e7e18934aa448166b1c37f8
// lat - 5e7e1f3b72af3a9f977ba6b7
count = 0;

//filter = {"val.country": "Mainland China"};
//filter = {_id: ObjectId("5e7e18934aa448166b1c37f8")};
filter = {val: { $exists: false}};

db.covid19.find(filter).limit(30000).forEach( (doc) => {
	print(count++);

		doc.val = doc.val || {};

		doc.val.confirmed = doc.Confirmed || 0;
		doc.val.recovered = doc.Recovered || 0;
		doc.val.deaths = doc.Deaths || 0;
		doc.val.active = doc.Active || 0;

		doc.val.date = getDate(doc);
		doc.val.country = getCountry(doc);
		doc.val.state = doc["Province_State"] || doc["Province/State"];
		doc.val.location = getLocation(doc);

		db.covid19.save(doc);

	// printjson(doc);

});

 function getDate(doc) {
	 let d = doc["Last_Update"] || doc["Last Update"];

	 if (d && d.substring(0, 4) === '2020') {
		return d.substring(0, 10);
	}

	 if (d) {
		 d = d.split(' ')[0]
		 const v = d.split('/');
		 let mm = v[0];
		 if (+mm < 10) mm = "0" + mm;

		 let dd = v[1];
		 if (+dd < 10) dd = "0" + dd;

		 let yyyy = v[2];
		 if (+yyyy < 2000) yyyy = "20" + yyyy;

		 return `${yyyy}-${mm}-${dd}`;
	 }

	 return undefined;

 }

 function getCountry(doc) {
	 let country = doc["Country_Region"] || doc["Country/Region"];

	 if (country === 'Mainland China')
	   country = 'China';


    return country;
 }
 
 function getLocation(doc) {
	 const lat = doc["Lat"] || doc["Latitude"];
	 const long = doc["Long_"] || doc["Longitude"];

	 if (lat || long) {
		const loc = {
			type: "Point",
			coordinates: [long, lat]
		};

		return loc;
	 }

	 return undefined;
}
	 