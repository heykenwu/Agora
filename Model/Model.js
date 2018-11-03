let User;
let MyVideo;
let channel = null;

//Key of the agora connection
const key = "aece2f9d13d041dc87742239bd788f49";
//Infomation about setting up the local Video and display the video
function Init(room) {
    console.log("AgoraRTC client initialized");
    //Join the Room
    User.join(channel, room, null, function(uid) {
      console.log("User " + uid + " join channel successfully");

      //Create Local Stream
        MyVideo = AgoraRTC.createStream({streamID: uid, audio: true, video: true, screen: false});
        MyVideo.setVideoProfile('720p');
        
        // Trigger if the user has denied access to the camera and mic.
        MyVideo.on("accessDenied",()=>{
            accessDenied();
        });
        //Display Local Stream
        MyVideo.init(function() {
          console.log("getUserMedia successfully");
          MyVideo.play('myvideo');
        //Publish the stream which the other users will be notisfied if you are in the same chat room
          User.publish(MyVideo, (err)=>{
            FailToPulish(err);
          });
        //Occur if it can not get the stream to display
        }, (err) => {
            FailToDisplay(err);
        });  
        //Occur if it cannot join the room
    }, (err)=>{
        FailToJoinRoom(err);
    });
    //Occur when you cannot connect to the server
  }
//Trigger when the user has denied access to the camera and mic.
  function accessDenied() {
      alert("access has been denid");
  }
  //Trigger when the user Fail to push the stream to the server
  function FailToPulish(err){
    console.log("Publish local stream error: " + err);
  }
  //Trigger when the stream fail to display
  function FailToDisplay(err) {
    console.log("Failed to get the stream display", err);
  }
  //Trigger when the user fail to join room
  function FailToJoinRoom(err) {
    console.log("Failed to join the room", err);
  }
  // Return the Channel Key (the key for joining the channel)
  function get_channel_key(){
    return this.channel;
  }
  //Set the channel key
  function setKey(key){
      this.channel = key;
  }