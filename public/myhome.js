/*
Broker: broker.hivemq.com

TCP Port: 1883

Websocket Port: 8000

TLS TCP Port: 8883

TLS Websocket Port: 8884
*/


// Subscriber MQTT CLient

const mqttClient_sub = new Paho.MQTT.Client('broker.hivemq.com', 8884, 'Dexter_lau_27s');

// Set callback handlers for this MQTT client
mqttClient_sub.onConnectionLost = onMqttConnectionLost_sub;
mqttClient_sub.onMessageArrived = onMqttMessageArrived_sub;

// Function to handle successful connection
function onMqttConnect_sub() {
  console.log('Connected to MQTT broker');
}

function onFailure_sub(err) {
  console.error('Connection failed:', err.errorMessage);
}

// Function to handle MQTT connection loss
function onMqttConnectionLost_sub(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('MQTT Connection lost:', responseObject.errorMessage);
  }
}

// Function to handle incoming MQTT messages
function onMqttMessageArrived_sub(message) {

  console.log('Received MQTT message:', message.payloadString);

  const messageContent = message.payloadString;
  const messageTopic = message.destinationName;

  // Create a new row for the two columns
  const rowElement = document.createElement('div');
  rowElement.classList.add('row');

  // Create the left column for the topic
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-md-6');
  leftCol.textContent = messageTopic;

  // Create the right column for the message content
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-md-6');
  rightCol.textContent = messageContent;

  // Append the left and right columns to the row
  rowElement.appendChild(leftCol);
  rowElement.appendChild(rightCol);

  // Get the container element where you want to display the messages
  const messageContainer = document.getElementById('message-container');

  // Append the new row element to the container
  messageContainer.appendChild(rowElement);

}

// Connect to the MQTT broker
mqttClient_sub.connect({
  useSSL: true,
  onSuccess: onMqttConnect_sub,
  onFailure: onFailure_sub,
});

// Function to handle MQTT subscription
function subscribeToMQTTTopic(topic) {
  mqttClient_sub.subscribe(topic);
  console.log(`Subscribed to MQTT topic: ${topic}`);
}

// Function to handle the Subscribe button click
function handleSubscribeClick() {
  const fsub_topic = document.getElementById('fsub_topic').value;
  subscribeToMQTTTopic(fsub_topic);
}


/************************************************************************** */

// Function to handle MQTT message sending
function sendMQTTMessage(topic, message) {
  // Create an MQTT client instance
  const client = new Paho.MQTT.Client('broker.hivemq.com', 8884, 'Dexter_26s');

  // Set callback handlers
  client.onConnectionLost = onConnectionLost_sender;
  client.onMessageArrived = onMessageArrived_sender;

  // Connect the client
  client.connect({
    useSSL: true,
    onSuccess: onConnect_sender,
    onFailure: onFailure_sender,
  });

  // Function to handle successful connection
  function onConnect_sender() {
    // Once connected, create and send an MQTT message
    const mqttMessage = new Paho.MQTT.Message(message);
    mqttMessage.destinationName = topic;
    client.send(mqttMessage);
    console.log('Message sent:', mqttMessage.payloadString);
  }

  // Function to handle connection failure
  function onFailure_sender(err) {
    console.error('Connection failed:', err.errorMessage);
  }

  // Function to handle connection loss
  function onConnectionLost_sender(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection lost:', responseObject.errorMessage);
    }
  }

  // Function to handle incoming messages (if needed)
  function onMessageArrived_sender(message) {
    console.log('Message received:', message.payloadString);
    // Handle incoming messages here if needed
  }
}

/*
function handleSubscribeClick() {
  const fsub_topic = document.getElementById('fsub_topic').value;
  // Assuming you want to subscribe to a topic when the Subscribe button is clicked
  subscriberToMQTTTopic(fsub_topic, 'Subscribe'); // You can modify the message payload as needed
}
*/

// Function to handle Publish button click
function handlePublishClick() {
  const fpub_topic = document.getElementById('fpub_topic').value;
  const pub_text = document.getElementById('pub_text').value;
  // Assuming you want to publish a message when the Publish button is clicked
  sendMQTTMessage(fpub_topic, pub_text);
}
