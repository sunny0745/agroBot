import "./App.css";
import React, { useEffect, useState } from "react";
import MainComponent from "./components/MainComponent";

let mode = 0;

function App() {
  const [bubbles, setBubbles] = useState([]);
  const [responseLoading, setResponseLoading] = useState(false);

  const initFunction = async () => {
    const message = document.getElementById("sendBox").value;

    if (message.toLowerCase() === "hi" || message.toLowerCase() ==="hello" || message.toLowerCase() ==="hey") {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);

    

      document.getElementById("sendBox").value = "";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response: "Hi, How can I help you?",
        },
      ]);
    }
    
    if (message.toLowerCase() === "ok" || message.toLowerCase() === "okay" || message.toLowerCase() === "okie") {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      document.getElementById("sendBox").value = "";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response: "Is there any other help which I can do?",
        },
      ]);
    }
    
    if (message.toLowerCase() === "what" || message.toLowerCase() === "why" || message.toLowerCase() === "when" ||
    message.toLowerCase() === "where" || message.toLowerCase() === "whom" || message.toLowerCase() === "whose" || 
    message.toLowerCase() === "how" ) {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      document.getElementById("sendBox").value = "";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response:
            "Sorry I didn't get it, could you just elaborate your question once again?",
        },
      ]);
    }

    if (message.toLowerCase() === " who made you ? " || message.toLowerCase() === " who created you ? " ||
    message.toLowerCase() === " who is your creator? " || message.toLowerCase() === " who built you ? " ||
     message.toLowerCase() === " who programmed you ? " ) {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      document.getElementById("sendBox").value = "";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response:
            "I am created by a group of students whose names are samarth singh bachhotiya , vedant rajput , sunny singh , richa parihar",
        },
      ]);
    }

    if (message.toLowerCase() === " what is your name ?" ) {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      document.getElementById("sendBox").value = "";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response:
            "my name is agroBot but you can call me mine.",
        },
      ]);
    } 
   
    if (message.toLowerCase() === " what is your gender ?" ) {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      document.getElementById("sendBox").value = "";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response:
            "As an artificial intelligence bot , I don't have a gender identity.",
        },
      ]);
    }

    if (message.toLowerCase().includes("generate") && message.toLowerCase().includes("image")) {
      const deletedChat = document.getElementById("deletedChat");
      deletedChat.style.display = "none";
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      setResponseLoading(true);
      let imageInput = message.toLowerCase().split("generate");
      document.getElementById("sendBox").value = "";
      let response = "";
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      response = await openai.createImage({
        prompt: imageInput[1],
        n: 1,
        size: "1024x1024",
      });
      setResponseLoading(false);
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "image",
          imageUrl: response.data.data[0].url,
        },
      ]);
    }

    if (
      message.length > 0 &&
      message.toLowerCase() !== "hi" &&
      message.toLowerCase() !== "hello" &&
      message.toLowerCase() !== "hey" &&
      message.toLowerCase() !== "ok" &&
      message.toLowerCase() !== "okay" &&
      message.toLowerCase() !== "okie" &&
      message.toLowerCase() !== "what" &&
      message.toLowerCase() !== "why" &&
      message.toLowerCase() !== "when"&&
      message.toLowerCase() !== "whom"&&
      message.toLowerCase() !== "where"&&
      message.toLowerCase() !== "whose"&&
      message.toLowerCase() !== "how"&&
      message.toLowerCase() !== " who made you ? " &&
      message.toLowerCase() !== " who created you ? "&&
      message.toLowerCase() !== " who is your creator ? "&&
      message.toLowerCase() !== " who built you ? "&&
      message.toLowerCase() !== " who programmed you ? "&&
      message.toLowerCase() !== " what is your name ? "&&
      message.toLowerCase() !== " what is your gender ?"&&
      !message.includes("generate") &&
      !message.includes("image")
    ) {
      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "client",
          response: message,
        },
      ]);
      const deletedChat = document.getElementById("deletedChat");
      deletedChat.style.display = "none";
      document.getElementById("sendBox").value = "";
      setResponseLoading(true);
      // bottom.scrollIntoView();
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message.toLowerCase(),
        max_tokens: 200,
        temperature: 0.2,
      });
      setResponseLoading(false);

      setBubbles((prevBubbles) => [
        ...prevBubbles,
        {
          side: "server",
          response: response.data.choices[0].text,
        },
      ]);
    }
    // bottom.scrollIntoView({ behavior: "smooth" });
  };

  const darkMode = () => {
    const body = document.getElementById("body");
    const topBar = document.getElementById("topBar");
    const sendBox = document.getElementById("sendBox");
    const sendBoxContainer = document.getElementById("sendBoxContainer");
    const sendButton = document.getElementById("sendButton");
    const deletedChat = document.getElementById("deletedChat");
    const mainSection = document.getElementById("MainSection");
    const bubbleClient = Array.from(
      document.querySelectorAll(".bubble.client")
    );
    const bubbleServer = Array.from(
      document.querySelectorAll(".bubble.server")
    );

    body.style.background = "#2D2424";
    topBar.style.background = "#5C3D2E";
    topBar.style.color = "#fff";
    sendButton.style.color = "#fff";
    sendBox.style.color = "#fff";
    sendBox.style.background = "#3d3232";
    deletedChat.style.color = "#fff";
    sendBoxContainer.style.background = "#5C3D2E";
    mainSection.style.background = "#2d2424";
    bubbleClient.map((element) => {
      element.style.background = "#5C3D2E";
      element.style.color = "#fff";
      return 0;
    });
    bubbleServer.map((element) => {
      element.style.background = "#B85C38";
      element.style.color = "#fff";
      return 0;
    });
    document.getElementById("mode").className = "barIcon fa-solid fa-moon";
  };

  const lightMode = () => {
    const body = document.getElementById("body");
    const topBar = document.getElementById("topBar");
    const sendBox = document.getElementById("sendBox");
    const sendBoxContainer = document.getElementById("sendBoxContainer");
    const sendButton = document.getElementById("sendButton");
    const deletedChat = document.getElementById("deletedChat");
    const mainSection = document.getElementById("MainSection");
    const bubbleClient = Array.from(
      document.querySelectorAll(".bubble.client")
    );
    const bubbleServer = Array.from(
      document.querySelectorAll(".bubble.server")
    );

    body.style.background = "#cad2c5";
    topBar.style.background = "#6A9373";
    topBar.style.color = "#fff";
    sendButton.style.color = "#fff";
    sendBox.style.color = "#000";
    sendBox.style.background = "#cad2c5";
    sendBoxContainer.style.background = "#6A9373";
    sendBoxContainer.style.color = "#fff";
    mainSection.style.background = "#92BB9B";
    deletedChat.style.color = "#000";
    bubbleClient.map((element) => {
      element.style.background = "#C5DACA";
      element.style.color = "#000";
      return 0;
    });
    bubbleServer.map((element) => {
      element.style.background = "#5c7f64";
      element.style.color = "#fff";
      return 0;
    });
    document.getElementById("mode").className = "barIcon fa-regular fa-moon";
  };

  useEffect(() => {
    if (bubbles.length > 0) {
      const bubbleClient = Array.from(
        document.querySelectorAll(".bubble.client")
      );
      const bubbleServer = Array.from(
        document.querySelectorAll(".bubble.server")
      );

      bubbleClient.map((element) => {
        element.style.transition = "0";
        return 0;
      });
      bubbleServer.map((element) => {
        element.style.transition = "0";
        return 0;
      });
    }

    const bottom = document.getElementById("bottom");
    bottom.scrollIntoView({ behavior: "smooth" });
    if (bubbles.length > 0) {
      const emptyChat = document.getElementById("emptyChat");
      emptyChat.style.display = "none";
    }
    if (mode % 2 !== 0) {
      darkMode();
    } else {
      lightMode();
    }
  }, [bubbles]);

  const deleteAll = () => {
    const deletedChat = document.getElementById("deletedChat");
    deletedChat.style.display = "flex";
    setBubbles([
      {
        side: "delete",
      },
    ]);
  };
  const toggleMode = () => {
    if (mode % 2 === 0) {
      darkMode();
    } else {
      lightMode();
    }
    mode++;
  };
setBubbles ({
  side: 'server',
  message: "Hiii"
})
  return (
    <>
      <MainComponent
        initFunction={initFunction}
        chat={bubbles}
        deleteAll={deleteAll}
        toggleMode={toggleMode}
        responseLoading={responseLoading}
      />
    </>
  );
}

export default App;
