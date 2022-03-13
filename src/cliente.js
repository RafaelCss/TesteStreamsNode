import axios from "axios";
import {Transform , Writable} from "stream"

const url = "http://localhost:3000";


async function consumer(){
    const response =  await axios.get(url, { responseType : "stream"})
    return response.data;
}

const stream = await consumer();

stream
.pipe(
  new Transform({
    transform(chunk, enc , cb){
      const item = JSON.parse(chunk);
      const idUser = /\d+/.exec(item.nome)[0]
      let name = item.nome

      if(idUser % 2 === 0) name = name.concat(' é par')
      else name = name.concat(' é impar')
      item.nome = name; 
      cb(null, JSON.stringify(item))
    }
  })
)
.pipe(
  new Writable({
    write(chunk, enc, cb){
      console.log('Já chegaram os dados!!', chunk.toString())
      cb()
    }
  })
)