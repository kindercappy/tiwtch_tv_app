var channels  = ['ESL_SC2','OgamingSC2','gamesdonequick','comster404 ','cretetion','ramzesdoto','thijshs','yetz','w33haa','gosu','p4wnyhof','iwilldominate','wraxu','freecodecamp','grimmmz','riotgamesjp','habathcx','RobotCaleb','noobs2ninjas','brunofin','imaqtpie'];
var baseUrl   = 'https://wind-bow.glitch.me/twitch-api/';
var urlStream = 'streams/';
var urlChannels = 'channels/'
var html      = [];
var ul        = $('ul');
function makeUrl(type,name){
	return baseUrl + type + name;
}
function fetchdata(dataStream){
	var streamType;
	var displayName;
	var game;
	var followers;
	var logo; 
	var profileUrl;
	streamType  = "Online";
	displayName = dataStream.stream.channel.display_name;
	game        = dataStream.stream.game;
	followers   = dataStream.stream.channel.followers;
	logo        = dataStream.stream.channel.logo;
	profileUrl  = dataStream.stream.channel.url;
	viewers     = dataStream.stream.viewers;

	pFollowers   = '<p>'  + '<b>Followers</b>: ' + '<i>' + followers + '</i>' + '</p>';
	pGame        = '<p>' + '<b>Game:</b> ' + '<i>' + game + '</i>' + '</p>';
	hStreamType  = '<h4>' + streamType + '</h4>';
	hDisplayName = '<h4>' +  displayName + '</h4>';
	img          = '<img  src="' + logo + '" >';
	pViewers     = '<p>' + '<b>Viewers:</b> ' + viewers + '</p>'
	htmldataStream     = '<li class="text-center"> <div class="container-fluid"> <a href="' + profileUrl + '" target="_blank"> <div class="row align-items-center borderGreen elementsContainer"> <div class="col-lg-2">' + img + '</div> <div class="col-lg-4"> ' +  hDisplayName + ' </div> <div class="col-lg-3"> ' +  hStreamType + pGame + '</div><div class="col-lg-3">' + pFollowers + pViewers +'</div> </div> </a></div> </li>' ;	
	
	return htmldataStream;
}
function fetchOfflineData(dataChannel){
	console.log(dataChannel);
	channelName  = dataChannel.display_name;
	console.log(channelName);
	streamType   = "Offline";
	profileUrl   = 'https://www.twitch.tv/'+channelName;
	logo = dataChannel.logo;
	if(channelName === undefined){
		channelName = "Channel does not exist";
		streamType="";
		profileUrl   = '#';
		logo         = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
	}
	game         = "No game";
	followers    = "Can't display followers";

	pFollowers   = '<p>'  +  followers + '</p>';
	pGame        = '<p>' + game + '</p>';
	hStreamType  = '<h4>' + streamType + '</h4>';
	hDisplayName = '<h4>' +  channelName + '</h4>';
	img          = '<img  src="' + logo + '" >';
	pViewers     = 'Can\'t show viewers'
	htmldataStream     = '<li class="text-center"> <div class="container-fluid"> <a href="' + profileUrl + '" target="_blank"> <div class="row align-items-center borderRed elementsContainer"><div class="col-lg-2">' + img + '</div><div class="col-lg-4"> ' +  hDisplayName + ' </div> <div class="col-lg-6"><h2>' + streamType + '</h2></div> </div> </a></div> </li>' ;	
	
	return htmldataStream;
}
function fadeIn(toAnimate){
	$(toAnimate).animate({
					opacity: 1
				},800);
}
function loaddataStream(){
	$.each(channels,function(index,channelNames){
		var stream;

		$.ajax({
			url: makeUrl(urlStream,channelNames),
			dataType: 'jsonp',
			success:function(dataStream){
				// console.log(dataStream);
				stream = dataStream.stream;
				if (stream !== null) {
					li   = fetchdata(dataStream);
					html.push(li);
					ul.append(html);
					fadeIn(ul);
					html =[];
				}
			}
		});
		$.ajax({
			url: makeUrl(urlChannels,channelNames),
			dataType: 'jsonp',
			success: function(dataChannel){
				if (stream === null) {
					channelDisplay = fetchOfflineData(dataChannel);
					ul.append(channelDisplay);
				}
			}
		});
	});
}
$(document).ready(function(){
	loaddataStream();
});