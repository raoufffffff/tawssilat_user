import { getDistance } from "geolib"

const MyHelp = (l1, l2) => {

    let des = getDistance(
        { latitude: l1.latitude, longitude: l1.longitude },
        { latitude: l2.location.latitude, longitude: l2.location.longitude })


    let timeing = Math.round((10 * (des / 1000)))
    let price = Math.round(20 * (des / 1000)) + 160
    return {
        des: des,
        timeing: timeing,
        price: price
    }
}

export default MyHelp