
const fs = require("fs");

const addPerson = (id, fname, lname, city, age) => {
    //1- بقرأ فايل من جيسون لاوبجيكت

    const allData = loadInfo()

    const duplicatedData = allData.filter((obj) => {
        return obj.id === id;
    });
    console.log(duplicatedData)

    if (duplicatedData.length === 0) {


        //2- الاضافة 
        allData.push({
            id: id,
            fname: fname,
            lname: lname,
            city: city,
            age: age
        });
        //خزن البيانات

        saveAllData(allData)
    }
    else {
        console.log("error duplicated data")

    }
}


const loadInfo = () => {
    try {
        const dataJson = fs.readFileSync("data10.json").toString()
        return JSON.parse(dataJson)
    }
    catch {
        return []
    }
}


const saveAllData = (allData) => {
    const allDataToJson = JSON.stringify(allData)
    fs.writeFileSync("data10.json", allDataToJson)
}



const deleteData = (id) => {
    const allData = loadInfo();

    const dataToKeep = allData.filter((obj) => {
        return obj.id != id
    })

    console.log(dataToKeep)
    console.log("you have deleted an item")

    saveAllData(dataToKeep)

}

const readData = (id) => {
    const allData = loadInfo();
    const itemNeeded = allData.find((obj) => {
        return obj.id == id;
    });
    if (itemNeeded) {
        console.log(itemNeeded);

    }
    else {
        console.log("id Not FOUND")
    }
}

const listData=()=>{
    const allData = loadInfo();
    
    allData.forEach((obj) => {
        console.log(obj.fname,obj.lname)
    });
}

module.exports = {
    addPerson,
    deleteData,
    readData,
    listData
}
