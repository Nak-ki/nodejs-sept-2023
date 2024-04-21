const path = require('node:path')
const readline = require('node:readline/promises')
const fsPromises = require('node:fs/promises')
const fs = require("node:fs");
const os = require("node:os");
const EventEmitter  = require('node:events');
const http = require('node:http');

async function foo() {
    try {
        // TODO: PATH
        // console.log(path.basename(__filename));
        // console.log(path.dirname(__filename));
        // console.log(path.extname(__filename));
        // console.log(path.parse(__filename).name);
        // console.log(path.join(__dirname, 'foo', 'bar', 'aaa' ));
        // console.log(path.normalize('/home///|anastasiia////|IdeaProjects/nodejs-sept-2023/foo//////////bar/aaa'))
        // console.log(path.isAbsolute('/home/|anastasiia/|IdeaProjects/nodejs-sept-2023/foo/bar/aaa\n'));


        // TODO: READLINE
    //     const rl = readline.createInterface({
    //         input: process.stdin,
    //         output: process.stdout
    //     })
    //         const name = await rl.question('Enter your name: ')
    //     console.log(`Hello ${name}!`);
    //
    //         const age = await rl.question('Enter your age: ')
    //     console.log(`You are ${age} years old!`);
    //
    //     process.exit(0)
    // //     OR rl.close()


        // TODO: FSPROMISES
        // await fsPromises.writeFile('text.txt', 'Hello Node.js!')
        // const pathToTestFile = path.join(__dirname, 'abv','text2.txt');
        // await fsPromises.writeFile(pathToTestFile, 'Hello Node.js 3!')
        // const data= await fsPromises.readFile(pathToTestFile);
        // console.log(data)
        // await fsPromises.appendFile(pathToTestFile, '\nAAAAAAAAAAA');
        // await fsPromises.rename(pathToTestFile, path.join(__dirname, 'test3.txt'));
        // await fsPromises.mkdir(path.join(__dirname, 'foo', 'bar'), {recursive: true});
        // await fsPromises.writeFile(path.join(__dirname, 'foo', 'bar', 'text4.txt'), 'Hello Node.js2!');
        // await  fsPromises.rmdir(path.join(__dirname, 'foo', 'bar'), {recursive: true});
        // await fsPromises.unlink(path.join(__dirname, 'test3.txt'));
        // await fsPromises.copyFile(path.join(__dirname, 'abv', 'text2.txt'), path.join(__dirname, 'text2.txt'))
        // const stats = await fsPromises.stat(path.join(__dirname, 'text2.txt'));
        // console.log(stats)
        // console.log(stats.isDirectory())
        // console.log(stats.isFile())


        // TODO: AS
        // console.log(os.arch())
        // console.log(os.cpus())
        // console.log(os.homedir())
        // console.log(os.hostname())
        // console.log(os.version())
        // console.log(os.platform())
        // console.log(os.machine())
        // console.log(os.uptime()/ 60 / 60 /24)
        // console.log(os.totalmem())
        // console.log(os.freemem())
        // console.log(os.networkInterfaces())


        // //TODO: EVENTS
        // const myEmitter = new EventEmitter
        // myEmitter.on('ev', (...args) => {
        //     console.log('an event occurred!', args)
        // })
        //
        // myEmitter.once('once-ev', () => {
        //     console.log('once-event occurred!')
        // })
        //
        // myEmitter.emit('ev', 344, 888)
        // myEmitter.emit('ev')
        // myEmitter.emit('ev')
        // myEmitter.emit('ev', 66666666)
        // myEmitter.emit('ev')
        // myEmitter.emit('once-ev')


        // TODO:HTTP-SERVER
// Create an HTTP server
        const server = http.createServer((req, res) => {
            res.end('okay');
        });

        server.listen(3000, '0.0.0.0', () => {
            console.log('Server is running at http://0.0.0.0:3000')
        });

    } catch (e) {
        console.error(e)
    }
}

void foo()