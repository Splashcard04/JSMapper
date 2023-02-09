const fs = require(`fs`)
const { diff } = require("../src/JSMapper")

class animation {
    constructor(path = "scene") {
        this.file = JSON.parse(fs.readFileSync(path+".rmmodel"))
    }

    animate(time, duration) {
        this.file.objects.forEach(obj => {
            const trackTag = Math.floor(Math.random() * 10)
            diff.customEvents.push({
                "b": time,
                "t": "AnimateTrack",
                "d": {
                    "track": `track${trackTag}`,
                    "duration": duration,
                    "position": obj.pos,
                    "scale": obj.scale,
                    "localRotaton": obj.rot
                }
            })

            diff.customData.environment.push(
                {
                    "geometry" :{
                        
                    },
                    "track": trackTag
                }
            )
        })
    }
}