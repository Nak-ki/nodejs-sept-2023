const fsPromises  = require('node:fs/promises')
const path = require("node:path");

async  function createDirect(){
    try {

        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'one'), {recursive:true});
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder',  'two'), {recursive:true});
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'three'), {recursive:true});
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder',  'four'), {recursive:true});
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder',  'five'), {recursive:true});

        //one
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'one', 'file_1.txt'), 'First five!');
        await fsPromises.copyFile(path.join(__dirname, 'baseFolder', 'one', 'file_1.txt'), path.join(__dirname, 'baseFolder', 'one', 'file_2.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'one', 'file_3.txt'), 'First five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'one', 'file_4.txt'), 'First five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'one', 'file_5.txt'), 'First five!');

        //two
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'two', 'file_6.txt'), 'Second five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'two', 'file_7.txt'), 'Second five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'two', 'file_8.txt'), 'Second five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'two', 'file_9.txt'), 'Second five!');
        await fsPromises.copyFile(path.join(__dirname, 'baseFolder', 'two', 'file_6.txt'), path.join(__dirname, 'baseFolder', 'two', 'file_10.txt'));

        //three
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'three', 'file_11.txt'), 'Third five!')
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'three', 'file_12.txt'), 'Third five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'three', 'file_13.txt'), 'Third five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'three', 'file_14.txt'), 'Third five!');
        await fsPromises.copyFile(path.join(__dirname, 'baseFolder', 'three', 'file_11.txt'), path.join(__dirname, 'baseFolder', 'three', 'file_15.txt'));

        //four
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'four', 'file_16.txt'), 'Fourth five!')
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'four', 'file_17.txt'), 'Fourth five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'four', 'file_18.txt'), 'Fourth five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'four', 'file_19.txt'), 'Fourth five!');
        await fsPromises.copyFile(path.join(__dirname, 'baseFolder', 'four', 'file_16.txt'), path.join(__dirname, 'baseFolder', 'four', 'file_20.txt'));

        //five
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'five', 'file_21.txt'), 'Fifth five!')
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'five', 'file_22.txt'), 'Fifth five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'five', 'file_23.txt'), 'Fifth five!');
        await fsPromises.writeFile(path.join(__dirname, 'baseFolder', 'five', 'file_24.txt'), 'Fifth five!');
        await fsPromises.copyFile(path.join(__dirname, 'baseFolder', 'five', 'file_21.txt'), path.join(__dirname, 'baseFolder', 'five', 'file_25.txt'));

    } catch (e){
        console.error(e)
    }
}


void createDirect()