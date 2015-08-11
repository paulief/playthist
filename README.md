# playthist
### All Your Music Anywhere
A simple Ionic-based application for making playlists from multiple music sources.

The goal of this application is to allow you to browse your music and playlists on other sources such as Soundcloud, Spotify, Apple Music, or your own library, and create playlists that hold songs from multiple sources.

I am implementing this using Ionic (http://ionicframework.com/), and Angular-based mobile development framework, in the front-end. And I use node.js with a Postgres database hosted on AWS in the back-end.

Since I am currently using this just as a learning experience, only the back-end database and node server are hosted at the moment (the front-end still needs to be hosted locally). To run the application locally, after cloning the repository, run `bower install` in the project directory to install the necessary dependencies. Then, start up an HTTP server inside the /www/ directory (I use the node module `http-server` for this).

####TODO
- Change all API keys and passwords since those used for testing exist in commit history, start using local config file
- Incorporate more sources (currently only have Soundcloud functionality)
- Incorporate local music library of device (could require custom Cordova plugin?)
- Add actual music streaming functionality
