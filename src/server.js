import http from 'http';
import {Readable} from 'stream';
import {randomUUID} from 'crypto'


function * run () {
  for(let i = 0; i<= 1000; i++){
    const data ={
      id : randomUUID(),
      nome :`Rafael - ${i}` 
    }
    yield data;
  }
}


 function handler(request, response) {
  const readable = new Readable({
      read(){
        for(const data of run()){
          console.log(data)
          this.push(JSON.stringify(data)+"\n");
        }
        // para informar que os dados acabaram 
        this.push(null);
      }
  })

  readable
  .pipe(response);

}



http.createServer(handler)
.listen(3000)
.on("listening", () => console.log("Server is running 3000"));