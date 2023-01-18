const fs = require(`fs`)

let diff = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat", "utf8"))

diff.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [], materials: {} }


class Map {
    constructor(input = "ExpertPlusLawless.dat", output = "ExpertPlusStandard.dat") {
        diff = JSON.parse(fs.readFileSync(input))
        this.out = output
        diff.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [], materials: {} }
    }

    config(settings = { beatmapCarachter: "Standard", require: ["yo"], suggest: ["yo"] }) {
        const info = JSON.parse(fs.readFileSync("Info.dat", 'utf8'))

        info._difficultyBeatmapSets.forEach(x => {
            
            if(x._beatmapCharacteristicName === settings.beatmapCarachter) {
                x._difficultyBeatmaps.forEach(y => {

                    y._customData._requirements = settings.require
                    y._customData._suggestions = settings.suggest
                })
            }
            
        })

        fs.writeFileSync("Info.dat", JSON.stringify(info, null, 4))
    }

    save() {
        fs.writeFileSync(this.out, JSON.stringify(diff, null, 4))
    }
}

class lightGradient {
    constructor(settings = { time: 0, type: 0, value: 0, gradient: { duration: 0, startColor: [0, 0, 0,0], endColor: [1, 1, 1, 1], easing: "idk" } } ) {
        this._time = settings.time
        this._type = settings.type
        this._value = settings.value
        this._customData = { 
            "_lightGradient": {
            "_duration": settings.gradient.duration,
            "_startColor": settings.gradient.startColor,
            "_endColor": settings.gradient.endColor,
            "_easing": settings.gradient.easing
        }}
    }

    push() {
        diff.events.push(this)
    }
}