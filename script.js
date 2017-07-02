var channels  = ['ESL_SC2','OgamingSC2','cretetion','freecodecamp','storbeck','habathcx','RobotCaleb','noobs2ninjas'];
var baseUrl   = 'https://wind-bow.glitch.me/twitch-api/';
var urlStream = 'streams/';
var html      = [];
var ul        = $('ul');
function makeUrl(type,name){
	return baseUrl + type + name;
}
function fetchData(data){
	var streamType;
	var displayName;
	var game;
	var followers;
	var logo; 
	var profileUrl;
	streamType  = "Online";
	displayName = data.stream.channel.display_name;
	game        = data.stream.game;
	followers   = data.stream.channel.followers;
	logo        = data.stream.channel.logo;
	profileUrl  = data.stream.channel.url;
	viewers     = data.stream.viewers;

	pFollowers   = '<p>'  + '<b>Followers</b>: ' + '<i>' + followers + '</i>' + '</p>';
	pGame        = '<p>' + '<b>Game:</b> ' + '<i>' + game + '</i>' + '</p>';
	hStreamType  = '<h4>' + streamType + '</h4>';
	hDisplayName = '<h4>' +  displayName + '</h4>';
	img          = '<img src="' + logo + '" >';
	pViewers     = '<p>' + '<b>Viewers:</b> ' + viewers + '</p>'
	htmlData     = '<li class="text-center"> <div class="container-fluid"> <a href="' + profileUrl + '" target="_blank"> <div class="row align-items-center borderGreen"> <div class="col-lg-2">' + img + '</div> <div class="col-lg-4"> ' +  hDisplayName + ' </div> <div class="col-lg-3"> ' +  hStreamType + pGame + '</div><div class="col-lg-3">' + pFollowers + pViewers +'</div> </div> </a></div> </li>' ;	
	
	return htmlData;
}
function fetchOfflineData(data,channelNames){
	streamType   = "Offline";
	displayName  = channelNames;
	game         = "No game";
	followers    = "Can't display followers";
	logo         = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
	profileUrl   = 'https://www.twitch.tv/' + channelNames;

	pFollowers   = '<p>'  +  followers + '</p>';
	pGame        = '<p>' + game + '</p>';
	hStreamType  = '<h4>' + streamType + '</h4>';
	hDisplayName = '<h4>' +  displayName + '</h4>';
	img          = '<img src="' + logo + '" >';
	pViewers     = 'Can\'t show viewers'
	htmlData     = '<li class="text-center"> <div class="container-fluid"> <a href="' + profileUrl + '" target="_blank"> <div class="row align-items-center borderRed"> <div class="col-lg-2">' + img + '</div> <div class="col-lg-4"> ' +  hDisplayName + ' </div> <div class="col-lg-6"><h2>' + streamType + '</h2></div> </div> </a></div> </li>' ;	
	
	return htmlData;
}
function loadData(){
	$.each(channels,function(index,channelNames){
		var stream;

		$.ajax({
			url: makeUrl(urlStream,channelNames),
			dataType: 'jsonp',
			success:function(data){
				console.log(data);
				stream = data.stream;
				if (stream !== null) {
					li   = fetchData(data);
					html.push(li);
					ul.append(html);
					html =[];
				}else {
					lii = fetchOfflineData(data,channelNames);
					html.push(lii);
				}
			}
		});
	});
}
$(document).ready(function(){
	//alert("Voila!");
	loadData();
});