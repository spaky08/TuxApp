
const Transport = require('../models/transport.model');
const axios=require('axios');
const Joi = require('joi');
var polyline = require('@mapbox/polyline');

const TransportSchema = Joi.object({
    lineNumber: Joi.string().required(),
    stopLocation: Joi.string(),
    initLocation:Joi.string(),
    
    
})
module.exports = {
    index,
    store,
    show
}
async function index(req,res) {
    let perPage = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;

    let transport = await Transport.find()
    .skip((perPage * page) - perPage)
    .limit(perPage);
    let count= await Transport.count();
    
    let routes=[];
    for (let i in transport){
        routes.push({_id:transport[i]._id,lineNumber:transport[i].lineNumber});
    }
    res.json({
        data:routes,  
        pages: Math.ceil(count / perPage),
        total:count
    });
}
async function show(req,res){
    let transport = await Transport.findById(req.params.id);
    res.json({data:transport});
    
}
async function store(req,res){
    
    for(let i=1;i<127;i++){
        await axios.get('https://api.tuxmapa.com.mx/v2/ruta/ruta'+i).then(r=>{
        let route=r.data;
        let input={
            lineNumber:"Ruta "+i,
            icon:"/img/stations/xhdpi/bus.png",
            stopLocation:{
                line:polyline.decode(route.puntos.lado_uno),
                color:"#ff5722"
            },
            initLocation:{
                line:polyline.decode(route.puntos.lado_dos),
                color:"#2962ff"
            }       
            
            
        };
        let transport =  Transport(input).save();
        
    },e=>{
        console.error("Error:"+i,e.message);
    });
}
res.json({status:200});

}





