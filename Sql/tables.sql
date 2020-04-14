CREATE TABLE "user" (
	"userId" SERIAL PRIMARY KEY NOT NULL,
	"isActive" BOOL DEFAULT false NOT NULL,
	"isDeleted" BOOL DEFAULT false NOT NULL,
	"type" SMALLINT DEFAULT 1,
	"permission" INT NOT NULL DEFAULT 0,
	"firstName" VARCHAR(255) NOT NULL,
	"lastName" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"phone" VARCHAR(16) NOT NULL UNIQUE,
	"password" VARCHAR(64) NOT NULL,
	"image" VARCHAR(255),
	"verificationCode" VARCHAR(5),
	"externalId" VARCHAR(255),
	"secretKey" VARCHAR(255) NOT NULL,
	"createOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "location" (
	"locationId" SERIAL PRIMARY KEY NOT NULL,
	"isActive" BOOL DEFAULT false NOT NULL,
	"isDeleted" BOOL DEFAULT false NOT NULL,
	"address" VARCHAR(255),
	"adminDistrict" VARCHAR(255),
	"adminDistrictCode" VARCHAR(255),
	"airportName" VARCHAR(255),
	"city" VARCHAR(255),
	"country" VARCHAR(255),
	"countryCode" VARCHAR(255),
	"displayName" VARCHAR(255),
	"disputedArea" BOOL,
	"ianaTimeZone" VARCHAR(255),
	"icaoCode" VARCHAR(4),
	"iataCode" VARCHAR(3),
	"locationCategory" VARCHAR(255),
	"locId" VARCHAR(255),
	"latitude" DECIMAL NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"neighborhood" VARCHAR(255),
	"postalCode" VARCHAR(255),
	"placeId" VARCHAR(255),
	"pwsId" VARCHAR(255),
	"type" VARCHAR(255) NOT NULL,
	"createOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "locationNear" (
	"locationNearId" SERIAL PRIMARY KEY NOT NULL,
	"locationId" INT,
	"isActive" BOOL DEFAULT false NOT NULL,
	"isDeleted" BOOL DEFAULT false NOT NULL,
	"stationId" VARCHAR(255),
	"stationName" VARCHAR(255) NOT NULL,
	"partnerId" VARCHAR(255),
	"qcStatus" VARCHAR(10),
	"updateTimeUtc" TIMESTAMP,
	"latitude" DECIMAL NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"distanceKm" DECIMAL,
	"distanceMi" DECIMAL,
	"createOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "weather" (
	"weatherId" SERIAL PRIMARY KEY NOT NULL,
	"locationNearId" INT,
	"isActive" BOOL DEFAULT false NOT NULL,
	"isDeleted" BOOL DEFAULT false NOT NULL,
	"country" VARCHAR(10),
	"epoch" INT,
	"humidity" INT,
	"latitude" DECIMAL,
	"longitude" DECIMAL,
	"neighborhood" VARCHAR(255),
	"obsTimeLocal" DATE,
	"obsTimeUtc" DATE,
	"qcStatus" VARCHAR(10),
	"realtimeFrequency" DECIMAL,
	"softwareType" VARCHAR(255),
	"solarRadiation" DECIMAL,
	"stationID" VARCHAR(255),
	"uv" DECIMAL,
	"winddir" DECIMAL,
	"imperial" JSON,
	"createOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);