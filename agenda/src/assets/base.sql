DROP TABLE evenements;
CREATE TABLE IF NOT EXISTS evenements (
  title VARCHAR(32) ,
  type VARCHAR(32),
  startTime Date ,
  endTime Date,
  allDay VARCHAR(32),
adresse VARCHAR(60));
/*
INSERT INTO evenements (title, type , startTime, endTime) VALUES ('dentiste' , 'rdv' ,'2018-10-25 15:00' , '2018-10-28 15:30' );
INSERT INTO evenements (title, type , startTime, endTime) VALUES ('soireejb' , 'soiree' ,'2018-10-28 20:00' , '2018-10-28 23:00' );
INSERT INTO evenements (title, type , startTime, endTime) VALUES ('tennis' , 'sport' ,'2018-10-24 18:00' , '2018-10-24 18:30' );
INSERT INTO evenements (title, type , startTime, endTime) VALUES ('dentiste' , 'rdv' ,'2018-10-23 17:00' , '2018-10-23 17:30' );
*/
