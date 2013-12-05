var spotifyAPI = require("./lib/spotify")();
var util = require("util");

spotifyAPI.searchAlbum({q:"coldplay"}, function(err,res){
	if (err) console.log(err);
	console.log(util.inspect(res));
});

// spotifyAPI.searchArtist({q:"coldplay"}, function(err,res){
// 	if (err) console.log(err);
// 	console.log(util.inspect(res));
// });

// spotifyAPI.searchTrack({q:"goksel"}, function(err,res){
// 	if (err) console.log(err);
// 	console.log(util.inspect(res));
// });

// spotifyAPI.lookup({uri:"spotify:artist:4YrKBkKSVeqDamzBPWVnSJ", extras:"album"}, function(err,res){
// 	if (err) console.log(err);
// 	console.log(util.inspect(res));
// });