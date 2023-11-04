//this file will save all the online driver locations with their socket IDs
type Ambulance = {
    id: number,
    latitude: number;
    longitde: number;
    heading: number;
    accuracy: number;
}

const drivers: Ambulance[] = [];

const addDriver = (ambulance: Ambulance) => {

    if (ambulance) {
        return {
            error: "faltan informacion de ambulancia"
        }
    }

    const {
        id,
        longitde,
        latitude,
        accuracy,
        heading
    } = ambulance;
  
    //check for existing drivers
    const existingDriver = drivers.find((driver) => {
        return driver.id === id
    })

    //validate index
    if (existingDriver) {
        return {
            error: 'User ya esta '
        }
    }

    //store driver 
    const driver = { id, latitude, longitde, heading, accuracy } as Ambulance;
    drivers.push(ambulance)

    return {
        driver
    }
}

const removeDriver = (id: number) => {
    const index = drivers.findIndex((driver) => driver.id === id)
    //-1 if match is not found 0 or high if found
    if (index !== -1) {
        //returns array of removed users we return on the first index which is the removed the Driver
        return drivers.splice(index, 1)[0]
    }
}

const getDriver = (id: number) => {
    return drivers.find((driver) => driver.id === id)
}


export {
    Ambulance,
    addDriver,
    removeDriver,
    getDriver,
    drivers
}