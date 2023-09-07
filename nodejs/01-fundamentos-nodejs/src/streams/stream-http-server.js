import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform{
  _transform(chunk, encoding, callbacks) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed);

    callbacks(null, Buffer.from(String(transformed)))
  }
}

// req => ReadbleStream
// res => WritebleStream


const server = http.createServer(async (req, res) =>  {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  // console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
})

server.listen(3334)