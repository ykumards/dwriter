import { pipeline, env } from "@xenova/transformers";

// Skip local model check
env.allowLocalModels = false;
env.useBrowserCache = false;

class PipelineSingleton {
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      console.log('Loading model...');
      self.postMessage({ status: 'initiate' });
      this.instance = await pipeline(this.task, this.model, {
        progress_callback: (progress) => {
          console.log('Model loading progress:', progress);
          self.postMessage({ status: 'progress', progress });
        }
      });
      console.log('Model loaded');
      self.postMessage({ status: 'ready' });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  console.log('Received message in worker:', event.data);

  if (event.data.text === 'initialization') {
    await PipelineSingleton.getInstance();
    return;
  }

  // Retrieve the classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let classifier = await PipelineSingleton.getInstance();

  // Actually perform the classification
  if (event.data.text) {
    console.log('Classifying text:', event.data.text);
    let output = await classifier(event.data.text);

    console.log('Classification output:', output);
    // Send the output back to the main thread
    self.postMessage({
      status: 'complete',
      output: output,
    });
    console.log('Posted Classification output:', output);
  } else {
    console.log('No text to classify');
  }
});