
/**
 ## Text Editing Example
 Here, I will give a short overview on how to enable collaborative text editing with the
 [PeerJs](http://peerjs.com/) Connector and the TextFramework Framework.

 PeerJs is a Framework that enables you to connect to other peers. You just need the
 user-id of the peer (browser/client). And then you can connect to it. In this example we will encode
 the client-id to which this client shall connect, in the url.
 It should look like this: http://../index.html?user_id

 First you have to include the following libraries in your html file:
 ```
<script src="http://cdn.peerjs.com/0.3/peer.js"></script>
<script src="../../build/browser/Frameworks/TextFramework.js"></script>
<script src="../../build/browser/Connectors/PeerJsConnector.js"></script>
<script src="./index.js"></script>
 ```
Open [index.html](./index.html) in order to start collaboration.
 */
var yatta;

function init(){
    /**
     First create the connector - the underlaying communication protocol.
     Here, we use the PeerJs connector. Its first parameter is the API key that you need to specify (see [website](http://peerjs.com/))
    */
    Y.createPeerJsConnector({key: 'h7nlefbgavh1tt9'}, function(Connector, user_id){
      /**
       TextFramework is a shared text object. If you change something on this object,
       it will be instantaneously shared with all the other collaborators.
      */
      yatta = new Y.TextFramework(user_id, Connector);

      /**
       Get the url of this frame. If it has a url-encoded parameter
       we will connect to the foreign peer.
       */
      var url = window.location.href;
      var peer_id = location.search
      var url = url.substring(0,-peer_id.length);
      peer_id = peer_id.substring(1);

      /**
       Set the shareable link.
       */
      document.getElementById("peer_link").setAttribute("href",url+"?"+user_id);

      /**
       Connect to other peer.
       */
      if (peer_id.length > 0){
        yatta.connector.connectToPeer(peer_id);
      }

      /**
       Bind yatta to the textfield.

       The .bind property is a method of the Word class. You can also use it with all the other Frameworks in Yatta (e.g. Json).
       */
      var textbox = document.getElementById("textfield");
      yatta.bind(textbox);
    });
}
window.onload = init
