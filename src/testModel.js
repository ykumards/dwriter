import { pipeline } from '@xenova/transformers';

// Allocate a pipeline for sentiment-analysis
let pipe = await pipeline(
    'sentiment-analysis',
    model_fil
);

let out = await pipe('I love transformers!');

console.log(out);
// [{'label': 'POSITIVE', 'score': 0.999817686}]