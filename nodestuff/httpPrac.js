import http from 'node:http';

const server = http.createServer((req, res) => {
    // my work. 
    const {headers, method, url} = req;
    let body = [];
    req.on('error', (err) => {
        console.error("Request error:", err);
    })
    .on('data', (chunk)=>{
        body.push(chunk);
    })
    .on('end', () =>{
        body = Buffer.concat(body).toString();
        res.on('error',(err)=>{
            console.error("Response error:", err);
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        const responseBody = {headers,method, url, body};
        res.write(JSON.stringify(responseBody));
        res.end();

    })
}).listen(8080)