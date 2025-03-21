import { pipeline, env } from "@xenova/transformers";

// Force remote models only - disable local model loading
env.allowLocalModels = false;
env.allowRemoteModels = true;
// Local paths not needed when using remote models
// env.localModelPath = '/assets/ml_models/';
// env.backends.onnx.wasm.wasmPaths = '/assets/wasm/';

class PipelineSingleton {
  static task = 'sentiment-analysis';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      console.log('Loading model...');
      self.postMessage({ status: 'initiate' });
      try {
        this.instance = await pipeline(this.task, this.model, {
          progress_callback: (progress) => {
            console.log('Model loading progress:', progress);
            self.postMessage({ status: 'progress', progress });
          }
        });
        console.log('Model loaded:', this.instance);
        self.postMessage({ status: 'ready' });
      } catch (error) {
        console.error('Error loading model:', error);
        self.postMessage({ status: 'error', error: error.message });
      }
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  console.log('Received message in worker:', event.data);

  try {
    if (event.data.text === 'initialization') {
      await PipelineSingleton.getInstance();
      return;
    }

    // Retrieve the classification pipeline
    let classifier = await PipelineSingleton.getInstance();
    
    // Actually perform the classification
    if (event.data.text) {
      console.log('Classifying text:', event.data.text);
      console.log('Classifier type:', typeof classifier);
      
      if (typeof classifier !== 'function') {
        console.log('Classifier is not a function, trying to call classify method');
        let output;
        if (classifier && typeof classifier.classify === 'function') {
          output = await classifier.classify(event.data.text);
        } else {
          throw new Error('Classifier has no valid classification method');
        }
        
        console.log('Classification output:', output);
        self.postMessage({
          status: 'complete',
          output: output,
        });
      } else {
        let output = await classifier(event.data.text);
        console.log('Classification output:', output);
        self.postMessage({
          status: 'complete',
          output: output,
        });
      }
    } else {
      self.postMessage({
        status: 'complete',
        output: [{ label: 'neutral', score: 1 }],
      });
      console.log('No text to classify');
    }
  } catch (error) {
    console.error('Error in worker:', error);
    self.postMessage({
      status: 'error',
      error: error.message
    });
  }
});