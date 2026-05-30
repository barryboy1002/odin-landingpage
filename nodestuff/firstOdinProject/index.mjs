import {createServer} from 'node:http';
import {readFile} from 'node:fs';
import {URL}  from 'node:url';
import {join} from 'node:path';
import {cwd} from 'node:process';


const host = "localhost";
const port = 8080;
const currentDir = cwd();

const server = createServer((request, response) =>{
    
    //const {headers, method, url} = request;

    if(request.url === "/favicon.ico"){
        response.writeHead(204, { "Content-Type": "image/x-icon" });
        response.end();
        return;
    }

    const pathname = new URL(request.url, `http://${host}:${port}`).pathname;

    const filePath = join(currentDir, `${pathname === '/' ? 'index.html': pathname}.html`);

   function showContent(err, content){
    if(err){
        const errorPagePath = join(currentDir, '404.html');
        response.writeHead(404,{'Content-Type': 'text/html'});

        return readFile(errorPagePath, (err,content)=>{
                response.end(content)
            }
    );
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(content);
   }

   readFile(filePath, showContent);
})


server.listen(port,host, () =>{
    console.log(`Server running at http://${host}:${port}/index`);
})