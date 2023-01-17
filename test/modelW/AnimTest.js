const { diffieHellman } = require("crypto");
const fs = require(`fs`)

let num = 0;
//const objects = JSON.parse(fs.readFileSync("Path", 'utf8'))
for(let i = 0; i <= 168; i++) {
    num = i
    const track = "track" + `${num}`
    console.log(track) 
}


class model {
    constructor(settings = { path: "idk", time: 0, duration: 10 }) {
        const file = JSON.parse(fs.readFileSync(settings.path, 'utf8'))
        let num = 0;
        let track;

        for(let i = 0; i <= 168; i++) {
            num = i
            track = "track" + `${num}`
        }

        file.objects.array.forEach(obj => {
            diff.custmData.customEvents.push({
                "b": settings.time,
                "d": {
                    "duration": settings.duration,
                    "animation": {
                        "localPosition": obj.pos,
                        "localRotation": obj.rot,
                        "scale": obj.scale
                    }
                }
            })

            diff.customData.Environment.push({
                "geometry": {
                    "material": {
                        "color": obj.color
                    },
                    "track": track                }
            })
        });
    }
}