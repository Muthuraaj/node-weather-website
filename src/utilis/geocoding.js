const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibXV0aHUwMiIsImEiOiJjbGF0bmxrYzkwMnowM3FyempsMnBxbjUzIn0.MytOA9Nd9OJ4yx3rFlt38w&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('there is an error',undefined)
        }
        else if(body.features.length ===0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features [0].center[1],
                longitude:body.features [0].center[0],
                location:body.features [0].place_name
            })
        }

    })
}

module.exports=geocode