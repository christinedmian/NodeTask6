const yargs = require("yargs")
const data10 = require("./data10")
yargs.command({
    command: "add",
    describe: "to add an item",
    builder: {
        fname: {
            describe: "this is the first name disc",
            //لحتى خلي هدا الكي اجباري بحطا خي بترو
            demandOption: true,
            type: "string"
        },
        lname: {
            describe: "this is the last name disc",
            demandOption: true,
            type: "string"
        },
    },
    handler: (x) => {
        //هون الاكس ماسكة الاوبجيكت يلي فيو الفيرست نيم واللاست نيم
        //اي بيانات بكتبا بالتيرمينال بتتخزن بلاكس
        data10.addPerson(x.id,x.fname, x.lname,x.city,x.age)
    }

})

yargs.parse()    //   بيشتغل على الهاندلر بسسسس    handler onlyy 

yargs.command({
    command:"delete",
    describe:"to delete an item",
    handler:(x)=>{
        data10.deleteData(x.id)
    }
})

// console.log(yargs.argv)



yargs.command({
    command:"read",
    describe:"to read an item",
    builder: {
        id: {
            describe: "this is the id  ",
            //لحتى خلي هدا الكي اجباري بحطا خي بترو
            demandOption: true,
            type: "string"
        },
    },
    handler:(x)=>{
        data10.readData(x.id)
    }
})
yargs.command({
    command:"list",
    describe:"to read an list",
    handler:()=>{
        data10.listData()
    }
})
yargs.parse()