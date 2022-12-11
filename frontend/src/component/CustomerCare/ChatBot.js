import React from "react";
import "./customerCare.css";
function ChatBot() {
  return (
    <>
      <div className="customer_care_main">
        <div className="chat">
          <iframe
            width="350"
            height="430"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/cf483400-ebbf-4498-b8b6-03da4d5227da"
          ></iframe>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7453.393054479957!2d86.4843213966953!3d20.924525693945927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1bf170699848f3%3A0x62e7077b74038a64!2sKamar%20Bandha%2C%20Kothar%2C%20Nachhipur%2C%20Odisha%20756117!5e0!3m2!1sen!2sin!4v1667149060128!5m2!1sen!2sin"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
