chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "speakSelectedText",
      title: "Speak Selected Text",
      contexts: ["selection"]
    });
  });
  
  // Listen for clicks on the context menu
  chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "speakSelectedText") {
      chrome.scripting.executeScript({
        target: { tabId: info.tabId },
        function: speakText,
        args: [info.selectionText]
      });
    }
  });
  
  // Function to speak text
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set the language
    window.speechSynthesis.speak(utterance);
  }
  