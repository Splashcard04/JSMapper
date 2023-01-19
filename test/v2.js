const fs = require(`fs`)

let diff = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat", "utf8"))

diff.customData = { _environment: [], _customEvents: [], materials: {} }


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

class Environment {
    constructor(id = "E", lookup = "Contains", settings = { position, rotation, lightID, lightType }) {
        this.id = id
        this.lookupMethod = lookup
        this.position = settings.position; this.rotation = settings.rotation; this.components = { "IlightWithID": { }}
    }
}

new Environment("Sun$", "Regex", {
    position: [
        0, -9999, 0
    ]
}).push()

new Environment("Sun$", {
    lookup: "Regex",
    position: [
        0, -9999, 0
    ]              
}).push()

new Environment({
    id: pwh,
    lookup: woeuig,
    mods: pjsvhfje
})