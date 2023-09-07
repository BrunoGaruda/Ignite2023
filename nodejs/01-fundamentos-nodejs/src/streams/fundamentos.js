// Netflix & Spotify

// Importação de clientes via CSV(Excel)
// 1gb - 1.000.000
// POST /upload import.csv 

// 10mb/s

// 100s -> Inserções no banco de dados

// Readble / Writable Streams

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++;

   setTimeout(() => {
    if(i > 100 ){
      this.push(null)
    } else {
      const buf = Buffer.from(String(i))

      this.push(buf)
    }
   }, 1000)
  }
}

class MultiplyByTenStream extends Writable{
  _write(chunk, encoding, callbacks) {
    console.log(Number(chunk.toString()) * 10);
    callbacks();
  }
}

class InverseNumberStream extends Transform{
  _transform(chunk, encoding, callbacks) {
    const transformed = Number(chunk.toString()) * -1

    callbacks(null, Buffer.from(String(transformed)))
  }
}



new OneToHundredStream()  // ReadbleStream
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())  // WritebleStream