# README #


### What is this repository for? ###

* This is the repository for the website: http://blizzard.cs.uwaterloo.ca/webike. 

### Contribution guidelines ###

* ISS4E Contributors: please ensure you do not include ANY database credentials in this public facing repository. All DB credentials should be read from a private file on the server. 
* The credentials reside in the configuration file stored at instance/config.py.
  An example for the file is this:
  ~~~
  DEBUG = True

  # Server
  HOSTNAME = "blizzard.cs.uwaterloo.ca"
  PORT = 5000

  # Database
  DB_HOST = "typhoon.cs.uwaterloo.ca"
  DB_PORT = 3306
  DB_NAME = "webike"
  DB_USER = "root"
  DB_PASSWD = "root"

  # URLs
  ASSETS_PATH = "/~sensordc/bootstrap"
  AJAX_URL_EXT = "/webike"
  ~~~



### Who do I talk to? ###

* Tommy, Ali.