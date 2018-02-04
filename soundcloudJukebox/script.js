var tracks;
var currentTrack = 0;
var soundCloud;

$(document).ready(function(){

SC.initialize({
   client_id: '833c3bb743118dcc480fb7ba93dadcf0'
});

//Search Form
$("#searchbutton").click(function(event){
$("#searchform").submit(function(event){
		event.preventDefault();
		$("#song").html("");
		spotifySearch( $("#search").val() );
});
});
function spotifySearch(term) {
	SC.get('/tracks', {
  		q: term
}).then(function(response) {
		tracks = response;
		playNext();
	});
};

function playNext() {
	SC.stream( '/tracks/' + tracks[currentTrack].id ).then(function(player){     
 		player.play();
		$("#artwork").attr("src", tracks[currentTrack].artwork_url);
		$("#title").html("Current Song: " + tracks[currentTrack].title);
 		player.on("finish",function(){
 			currentTrack += 1;
			player.play()
		});
	});
};
 




//Song control buttons

$("#stop").click(function(event){
	// console.log(event);
	stopPlay();
});

$("#start").click(function(event){
	startPlay();
});

$("#next").click(function(event){
	nextPlay();
});

$("#previous").click(function(event){
	previousPlay();
});

$("#shuffle").click(function(event){
	shufflePlay();
});

});

// function playNext() {


function stopPlay() {
	soundCloud.pause();
}
function startPlay() {
	soundCloud.play();
}

function nextPlay() {
	SC.stream( "/tracks/" + tracks[currentTrack].id ).
		then(function(player) {
		soundCloud = player;
			if (currentTrack == tracks.length -1 ) {
				currentTrack = 0
				soundCloud.play()
			} else {
				currentTrack += 1;
				soundCloud.play()
			}
			$("#artwork").attr("src", tracks[currentTrack].artwork_url);
			$("#title").html("Current Song: " + tracks[currentTrack].title);
		});
}

function previousPlay() {
	SC.stream( "/tracks/" + tracks[currentTrack].id ).then(function(player) {
		soundCloud = player;
		if (currentTrack == 0 ) {
				currentTrack = 0
				soundCloud.play()
			} else {
				currentTrack -= 1;
				soundCloud.play()
			}
			$("#artwork").attr("src", tracks[currentTrack].artwork_url);
			$("#title").html("Current Song: " + tracks[currentTrack].title);
		});
}




