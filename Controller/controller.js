//check if the broswer is support the webrtc
if(!AgoraRTC.checkSystemRequirements()) {
    alert("Your broswer may not support this webRTC!");
}
// This function is separeted to 3 steps.
  function join() {
    User = AgoraRTC.createClient({mode: 'interop'});
    let name = document.getElementById("name").value;
    let room = document.getElementById("channel").value;
    //First, user initialized which is to connect to the server.
    User.init(key, () => {
        Init(room);
    }, (err) => {
      console.log("User init failed", err);
    });
    setKey("");
    User.on('error', function(err) {
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        User.renewChannelKey(channelKey, function(){
          console.log("Renew channel key successfully");
        }, function(err){
          console.log("Renew channel key failed: ", err);
        });
      }
    });
  //Event trigger when the stream from other users is successfully added
    User.on('stream-added', function (user) {
    var stream = user.stream;
    User.subscribe(stream, function (err) {
      console.log("Subscribe Error" + err);
    });
    });
    //Event trigger when the stream from other users is successfully subscribed which means it is ready to display
    User.on('stream-subscribed', function (evt) {
    var stream = evt.stream;
    if ($('div#remotecontrol #agora_remote'+stream.getId()).length === 0) {
        $('div#remotecontrol').append('<div id="agora_remote'+stream.getId()+'" style="width:250px;height:250px;"></div>');
    }
    stream.play('agora_remote' + stream.getId());
    });

    //When the user leaves the room, it will remove the video  
    User.on('peer-leave', function (user) {
    var stream = user.stream;
    if (stream) {
        stream.stop();
        $('#agora_remote' + stream.getId()).remove();
        console.log(user.uid + " leaved from this channel");
    }
  });
    $("#formcontainer").remove();
}

