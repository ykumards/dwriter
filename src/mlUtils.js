// src/mlUtils.js

export const checkText = (inputText) => {
    // Simulate a heavy computation task
    const start = Date.now();
    while (Date.now() - start < 100) {
      // Busy wait for 100 milliseconds
    }

    const result = inputText.includes('nice') ? 'yay' : 'noo';
    console.log(result);
    return result;
  };