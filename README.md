# DoomsWriter

<div style="text-align: center;">
  <img src="src/assets/dw_logo.png" alt="DoomsWriter Logo" width="300"/>
</div>

## Hello

DoomsWriter (DW) is a minimalistic journal app that destroys the text and retains the emotion.

It started as a way for me to learn React but I extended it a bit to embed small [DistilRoberta model](https://huggingface.co/j-hartmann/emotion-english-distilroberta-base) to do real-time emotion detection. The app is completely secure because it uses [transformers.js](https://huggingface.co/docs/transformers.js/index) to serve the model using ONNX Runtime and WASM.

## Features

The app is pretty basic and has two main views (or Components 😉️) -- Editor and Calendar. The shortcut `Cmd + ;` toggles between Editor and Calendar views.

- Type the text in the Editor and get real-time emotion recognition (this can be turned off if its too distracting).
- Press `Cmd + Enter` to capture the emotion and clear the text.
- View the emotions in the Calendar

## Inside

The frontend is written in plain-ol Javascript and React. I took a gamble and used [Tauri](https://tauri.app/) instead of [Electron](https://josephg.com/blog/electron-is-flash-for-the-desktop/) for the multi-platform support, and so far it has been very plesant! 
