import {Pool} from 'undici';

const GemmaPool  = new Pool("http://localhost:11434", {connections: 10});


async function streamOllamaCompletion(prompt){
    const {statusCode , body} = await GemmaPool.request({
        path: "/api/generate",
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt,model:"gemma4:latest"}),

    });

    if(statusCode !== 200){
        await body.dump();
        throw new Error(`Request failed with status code ${statusCode}`);
    }

    let partial = "";

    const decoder = new TextDecoder();

    for await( const chunk of body){
        partial += decoder.decode(chunk, {stream: true});
        console.log(partial);
    }

    console.log("Stream completed");
}

try {
  await streamOllamaCompletion('What is recursion?');
} catch (error) {
  console.error('Error calling Ollama:', error);
} finally {
  console.log('Closing Ollama pool.');
  GemmaPool.close();
}