const EARTH_RADIUS = 6378.137; //地球半径  
//将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
const rad =(d)=> {
    return d * Math.PI / 180.0;
}
/** 
 * 谷歌地图计算两个坐标点的距离 
 * @param lng1  经度1 
 * @param lat1  纬度1 
 * @param lng2  经度2 
 * @param lat2  纬度2 
 * @return 距离（千米） 
 */
const getDistance = (lng1, lat1, lng2, lat2)=> {
    let radLat1 = rad(lat1);
    let radLat2 = rad(lat2);
    let a = radLat1 - radLat2;
    let b = rad(lng1) - rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}

module.exports = {
    getDistance
}
