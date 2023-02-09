const fs = require(`fs`)

/*
If you are confused why everything is in 1 main js file, let me explain-
imports / exports are dumb in js.
*/

/**
 * log a message from JSMapper
 * @param { string } msg the message to log tagged with JSM
 * @param { string } errorLevel add warning or error based on situation
 */

function JSMlog(message, errorLevel) {
    if(!errorLevel) {
        console.log(`\x1b[32m [JSMapper]:` + `\x1b[1m \x1b[37m ${message}`)
    }
    if(errorLevel == "Error") {
        console.log(`\x1b[1m \x1b[31m [Error In JSMapper]:` + `\x1b[1m \x1b[37m ${message}`)
    }
    if(errorLevel == "Warning") {
        console.log(`\x1b[1m \x1b[33m [Warning In JSMapper]:` + `\x1b[1m \x1b[37m ${message}`)
    }
  }

let diff = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat", "utf8"))

diff.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [], materials: {} }

class Map {
    
    /**aa
    * Initialize a map with an input difficulty and and output difficulty
    * @param input the input to read **Put Notes Here**
    * @param output the output to apply changes to
    * @method config apply requirements, suggestions and file formatting to your info.dat file
    * @method save apply changes to the specified output file
    */
    constructor(input = "ExpertPlusLawless", output = "ExpertPlusStandard") {
        diff = JSON.parse(fs.readFileSync(input+".dat"))
        this.out = output
        diff.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [], materials: {} }
    }
    
    /**apply requirements, suggestions and fileFormatting to your difficulty file*/
    config(settings = { require: ["yo"], suggest: ["yo"], formatDataFile: false }) {
        if(!settings.formatDataFile || settings.formatDataFile) { this.format = false } else { this.format = settings.formatDataFile }
        const info = JSON.parse(fs.readFileSync("Info.dat", 'utf8'))

        info._difficultyBeatmapSets.forEach(x => {
            
            if(x._beatmapCharacteristicName.indexOf(this.out) !== -1) {
                x._difficultyBeatmaps.forEach(y => {

                    y._customData._requirements = settings.require
                    y._customData._suggestions = settings.suggest
                })
            }
            
        })

        fs.writeFileSync("Info.dat", JSON.stringify(info, null, 4))
    }
    
         /**log data from your map to the console */
    log(settings = { vanila: true, modded: false }) {
        if(!settings || settings.vanila === true && settings.modded === false) {
            console.log(`
            \x1b[36m\x1b[4m\x1b[1mVanila Map Data:\x1b[0m \n
            \x1b[35m\x1b\x1b[1m\x1b[4mObjects:\x1b[0m
            \x1b[35m\x1b\x1bb   Bloqs: ${diff.colorNotes.length}
            \x1b[35m\x1b\x1bb   Chains: ${diff.burstSliders.length}
            \x1b[35m\x1b\x1bb   Arcs: ${diff.sliders.length}
            \x1b[35m\x1b\x1bb   Bombs: ${diff.bombNotes.length}
            \x1b[35m\x1b\x1bb   Walls: ${diff.obstacles.length}\x1b[0m
            \x1b[34m\x1b\x1b[1m\x1b[4mEvents:\x1b[0m
            \x1b[34m\x1b\x1bb   Light Events: ${diff.basicBeatmapEvents.length}
            \x1b[34m\x1b\x1bb   Boost Color Events: ${diff.colorBoostBeatmapEvents.length}
            `)
        }
        if(settings.modded === true && settings.vanila === false) {
            console.log(`
            \x1b[36m\x1b[1m\x1b[4mModded Map Data:\x1b[0m
            \n
            \x1b[35m\x1b\x1b[1m\x1b[4mFake Objects:\x1b[0m
            \x1b[0m
            \x1b[35m    Fake Bloqs: ${diff.customData.fakeColorNotes.length}
            \x1b[35m    Fake Chains: ${diff.customData.fakeBurstSliders.length}
            \x1b[35m    Fake Bombs: ${diff.customData.fakeBombNotes.length}
            \x1b[35m    Fake Walls: ${diff.customData.fakeObstacles.length}
            \n
            \x1b[34m\x1b[1m\x1b[4mMisc:\x1b[0m
            \x1b[0m
            \x1b[34m\x1b[1m    Custom Events: ${diff.customData.customEvents.length}
            \x1b[34m\x1b[1m    Environment: ${diff.customData.environment.length}
            `)
        }
        if(settings.modded === true && settings.vanila === true) {
            console.log(`
            \x1b[36m\x1b[4m\x1b[1mVanila Map Data:\x1b[0m\x1b[0m \n
                \x1b[0m
                \x1b[35m\x1b\x1b[1m\x1b[4mObjects:\x1b[0m
                \x1b[0m
                \x1b[35m\x1b\x1bb   Bloqs: ${diff.colorNotes.length}
                \x1b[35m\x1b\x1bb   Chains: ${diff.burstSliders.length}
                \x1b[35m\x1b\x1bb   Arcs: ${diff.sliders.length}
                \x1b[35m\x1b\x1bb   Bombs: ${diff.bombNotes.length}
                \x1b[35m\x1b\x1bb   Walls: ${diff.obstacles.length}
                \x1b[0m
                \x1b[34m\x1b\x1b[1m\x1b[4mEvents:\x1b[0m
                \x1b[0m
                \x1b[34m\x1b\x1bb   Light Events: ${diff.basicBeatmapEvents.length}
                \x1b[34m\x1b\x1bb   Boost Color Events: ${diff.colorBoostBeatmapEvents.length}
                \n\n
                \x1b[36m\x1b[1m\x1b[4mModded Map Data:\x1b[0m
                \n
                \x1b[35m\x1b\x1b[1m\x1b[4mFake Objects:\x1b[0m
                \x1b[0m
                \x1b[35m    Fake Bloqs: ${diff.customData.fakeColorNotes.length}
                \x1b[35m    Fake Chains: ${diff.customData.fakeBurstSliders.length}
                \x1b[35m    Fake Bombs: ${diff.customData.fakeBombNotes.length}
                \x1b[35m    Fake Walls: ${diff.customData.fakeObstacles.length}
                \n
                \x1b[34m\x1b[1m\x1b[4mMisc:\x1b[0m
                \x1b[0m
                \x1b[34m\x1b[1m    Custom Events: ${diff.customData.customEvents.length}
            
                \x1b[34m\x1b[1m    Environment: ${diff.customData.environment.length}
            `)
        }
    }
    
    /**save all changes to the specified output data file*/
    save() {
        if(!this.format || this.format === undefined | false) {
           fs.writeFileSync(this.out+".dat", JSON.stringify(diff, null, 0))
        } else {
           fs.writeFileSync(this.out+".dat", JSON.stringify(diff, null, 4))
        }
    }
    
    //variables////////////////////////////////////

    get notes() { return diff.colorNotes }
    get fakeNotes() { return diff.customData.fakeColorNotes }
    get walls() { return diff.obstacles }
    get fakeWalls() { return diff.customData.fakeObstacles }
    get bombs() { return diff.bombNotes }
    get fakeBombNotes() { return diff.customData.fakeBombNotes }
    get chains() { return diff.burstSliders }
    get fakeChains() { return diff.customData.fakeBurstSliders }
    get arcs() { return diff.sliders }
    get lightEvents() { return diff.basicBeatmapEvents }

    get materials() { return diff.customData.materials }
    get environment() { return diff.customData.environment }
    get customEvents() { return diff.customData.customEvents }
}


/**
 * generate a random number / integer between 2 values
 * @param { number } number1 the first number (does not have to be the minimum)
 * @param { number } number2 the second number (does not have to be the maximum)
 * @returns a random number wetween the 2 values
 */
function r(number1 = 0, number2 = 10, rounding = false) {
    if(rounding === true) {
        if(number1 > number2) {
            return Math.floor(Math.random() * (number1 - number2) + number2) +1
        } else {
            return Math.floor(Math.random() * (number2 - number1) + number1) +1
        }
    }
    if(!rounding || rounding === false) {
        if(number1 > number2) {
            return Math.random() * (number1 - number2) + number2
        } else {
            return Math.random() * (number2 - number1) + number1
        }
    }
}


class Note {
    constructor(time = 0, settings = { type: 0, cutDirection: 0, angleOffset: 0, worldRotation: [0, 0, 0], animateRotation: [0, 0, 0], njs: 8, timeOffset: 0, interactable: false, color: [1, 1, 1, 1], track: "track", dissolve: [[0, 0], [0, 1]], dissolveArrow: [[1, 0], [1, 1]], animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]], track: "track" }) {
        if(!time) { this.b = 0 } else { this.b = time }
        this.x = 0
        this.y = 0
        if(!settings.type) { this.c = 0 } else { this.c = settings.type }
        if(!settings.cutDirection) { this.d = 0 } else { this.d = settings.cutDirection }
        if(!settings.angleOffset) { this.a = 0 } else { this.a = settings.angleOffset }

        let uninteractable = false
        if(settings.interactable === true) { uninteractable = false } else { uninteractable = true }

        const animation = { "color": settings.color, "position": settings.animatePosition,  "dissolve": settings.dissolveArrow, "definitePosition": settings.definitePosition, "scale": settings.animateScale }

        this.customData = { "worldRotation": settings.worldRotation, "NJS": settings.njs, "timeOffset": settings.timeOffset, "track": settings.track, uninteractable: uninteractable, "track": settings.track, "animation": animation }
    }

    push(fake = true) {
        if(fake === true) {
            diff.customData.fakeColorNotes.push(this)
        } else {
            diff.colorNotes.push(this)
        }
    }
}



 class Wall {
    constructor(time = 0, duration = 10, settings = { position, width, height, color, scale, definitePosition, animateRotation, animateLocalRotation, worldRotation, njs, timeOffset, interactable, dissolve, track: "track" }) {
        if(!time) { this.b = 0 } else { this.b = time }
        this.x = 0
        this.y = 0

        if(!duration) {
            this.d = 10
        } else {
            this.d = duration
        }

        if(!settings.width) {
            this.w = 1
        } else {
            this.w = settings.width
        }

        if(!settings.height) {
            this.h = 1
        } else {
            this.h = settings.height
        }

        let position;
        if(!settings.position) {
            position = [0, 0]
        } else {
            position = settings.position
        }

        
        let uninteractable;
        if(settings.interactable) {
            if(settings.interactable === true) {
                uninteractable = false
            } else {
                uninteractable = true
            }
        } else {
           uninteractable = false
        }

        

        this.customData = { "color": settings.color, "size": settings.scale, "uninteractable": uninteractable, "noteJumpMovementSpeed": settings.njs, 
        "worldRotation": settings.worldRotation, "track": settings.track,
        "noteJumpStartBeatOffset": settings.timeOffset, "coordinates": settings.position,
        "animation": { "dissolve": settings.dissolve, "definitePosition": settings.definitePosition, "localRotation": settings.animateLocalRotation, "rotation": settings.rotation } }

    }


    push(fake = false) {
        if(fake) {
            diff.customData.fakeObstacles.push(this)
        } else {
            diff.obstacles.push(this)
        }
    }
}


class Bomb {
    constructor(time = 0, settings = { position: [0, 0], worldRotation: [0, 0, 0], localRotation: [0, 0, 0, 0], rotation: [0, 0, 0], njs: 8, timeOffset: 0, interactable: true, color: [1, 1, 1, 1], track: "track", dissolve: [[0, 0], [0, 1]], animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], scale: [[1, 1, 1, 0], [1, 1, 1, 1]], animateColor: [[0, 0, 0, 0], [0, 0, 0, 1]] }) {
        if(!time) { this.b = 0 } else { this.b = time }

        this.x = 0
        this.y = 0

        if(!settings.interactable) {
            this.uninteractable = false
        } else {
            if(settings.interactable === true) {
                this.uninteractable = false
            } else {
                this.uninteractable = true
            }
        }

        this.customData = { "coordinates": settings.position, "worldRotation": settings.worldRotation, "color": settings.color, "localRotation": settings.localRotation, 
        "rotation": settings.localRotation, "animation": { "dissolve": settings.dissolve, "position": settings.animatePosition, "definitePosition": settings.definitePosition,
        "scale": settings.scale, "color": settings.animateColor } }
    }

    push(fake = false) {
        if(fake === true) {
            diff.customData.fakeBombNotes.push(this)
        } else {
            diff.bombNotes.push(this)
        }
    }
}

class Environment {
    constructor(settings = {  }/*{ id, position, scale, rotation, duplicate, active, localPosition, localRotation, track, lightID, lightType }*/) {
        this.id = settings.id
        this.lookupMethod = settings.lookup
        this.position = settings.position
        this.scale = settings.scale
        this.rotation = settings.rotation
        this.duplicate = settings.duplicate
        this.active = settings.active
        this.localPosition = settings.localPosition
        this.localRotation = settings.localRotation
        this.track = settings.track

        this.components = { "IlightWithId": { "lightID": settings.lightID, "lightType": settings.lightType } }

    }

    push() {
        diff.customData.environment.push(this)
    }
}

const lookup = {
    contains: "Contains",
    regex: "Regex",
    exact: "Exact",
    endsWith: "EndsWith",
    startsWith: "StartsWith"
}


class Geometry {
    constructor(settings = { type: "Cube", material: { color: [0, 0, 0, 0], shader: "Standard", shaderKeywords: [], track: "track" } | string, scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0], lightID: 100, lightType: 0, track: "bruhhowdidinotknowaboutthisfeaturelmao" }) {
        
        let material;
        let type;
        if(!settings.material) { material = { shader: "Standard" } } else { material = settings.material }
        if(!settings.type) { type = "Cube" } else { type = settings.type }

        this.geometry = { "type": type, "material": material }

        this.scale = settings.scale
        this.position = settings.position
        this.rotation = settings.rotation
        this.track = settings.track

        this.components = { "ILightWithId": { "lightID": settings.lightID, "lightType": settings.lightType }}
    }

    push() {
        diff.customData.environment.push(this)
    }
}

class modelToWall {
    constructor(path = "path" ,settings = { time: 0, duration: 10 }) {
        this.path = JSON.parse(fs.readFileSync(path+".rmmodel", 'utf8'))
        this.objects = this.path.objects

        this.duration = settings.duration
        this.time = settings.time
    }

    push() {
        this.objects.forEach(obj => {
            diff.customData.fakeObstacles.push({
                "b": this.time,
                "x": 1,
                "y": 0,
                "d": this.duration,
                "w": 1,
                "h": 3,
                "customData": {
                    "color": obj.color,
                    "animation": {
                        "size": obj.scale,
                        "definitePosition": obj.pos,
                        "localRotation": obj.rot
                    }
                }
            })
        })
    }
}

class modelToEnvironment {
    constructor(path, settings = { id: "Environment", lookup: "Contains", lightID: 100, lightType: 0 }) {
        this.file = JSON.parse(fs.readFileSync(path+".rmmodel", 'utf8'))

        let id;
        let lookup;

        if(!settings.id) {
            id = "Environment"
        } else {
            id = settings.id
        }

        if(!settings.lookup) {
            lookup = "Contains"
        } else {
            lookup = settings.lookup
        }

        this.components = { "IlightWithID": {"lightID": settings.lightID, "lightType": settings.lightType}}
    }

    push() {
        const objects = this.file.objects
        objects.forEach(obj => {
            diff.customData.environment.push({
                "id": this.id,
                "lookupMethod": this.lookup,
                "duplicate": 1,
                "localPosition": obj.pos,
                "localRotation": obj.rot,
                "scale": obj.scale,
                "components": this.components
            })
        })
    }
}

class modelToGeometry {
    constructor(fileName = "scene", settings = { type: "Cube" | "Cylinder" | "Capsule" | "Triangle",
    material: {
        shader: "Standard" | "OpaqueLight" | "TransparentLight" | "BillieWater" | "BaseWater" | "WaterfallMirror"|
        "BTSPillar" | "InterscopeCar" | "InterscopeConcrete", color: [1, 1, 1,1], shaderKeywords: ["string"]
    } }) {
        this.file = JSON.parse(fs.readFileSync(fileName+".rmmodel"))
        this.baseMat = settings.material
        this.type = settings.type
    }

    addObjects(track = "blaargz", settings = { type: "Cube" | "Cylender" | "Capsule" | "Triangle", 
        material: {
            shader: "Standard" | "OpaqueLight" | "TransparentLight" | "BillieWater" | "BaseWater" | "WaterfallMirror"|
        "BTSPillar" | "InterscopeCar" | "InterscopeConcrete", 
        color: [1, 1, 1,1], shaderKeywords: ["string"]
        }
    }) {
        this.file.objects.forEach(obj => {
            if(obj.track === track) {
                diff.geometry.push(
                    {
                        "geometry" : {
                            "type": settings.type,
                            "material": settings.material
                        },
                        "scale": obj.scale,
                        "position": obj.pos,
                        "localRotation": obj.rot
                    }
                )
            }
        })
    }

    push() {
        this.file.objects.forEach(obj => {
            diff.customData.environment.push({"geometry": {
                "type": this.type,
                "material": this.baseMat,
            },
            scale: obj.scale,
            "localRotation": object.rot,
            "localPosition": obj.pos
        })
        })
    }
}





const lightTypes = {
    backLasers: 0,
    ringLights: 1,
    leftLasers: 2,
    rightLasers: 3,
    centerLasers: 4,
    extraLeft: 6,
    extraRight: 7,
    billieLeft: 10,
    billieRight: 11,
    gagaLeft: 18,
    gagaRight: 19
}


class animateTrack {
    constructor(settings = { time: 0, duration: 10, track: "track", 
    animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]],
    animateRotation: [[0, 0, 0, 0], [0, 0, 0, 1]],
    animateDissolve: [[0, 0], [0, 1]], 
    animateDissolveArrow: [[1, 0], [1, 1]], 
    animateDefinitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], 
    animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]],
    animateColor: [[1, 1, 1, 0], [1, 1, 1, 1]]
    }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }
        if(!settings.duration) { this.duration = 10 } else { this.duration = settings.duration }

        this.track = settings.track
        this.rot = settings.animateRotation
        this.pos = settings.animatePosition
        this.dis = settings.animateDissolve
        this.disa = settings.animateDissolveArrow
        this.defpos = settings.animateDefinitePosition
        this.scale = settings.animateScale
        this.color = settings.animateColor

        //this.d = {"position": settings.animatePosition, "dissolve": settings.animateDissolve, "dissolveArrow": settings.animateDissolveArrow, 
        //"definitePosition": settings.animateDefinitePosition, "scale": settings.animateScale, "color": settings.animateColor }
    }

    push() {
        diff.customData.customEvents.push({
            "b": this.time,
            "t": "AnimateTrack",
            "d": {
                "track": this.track,
                "duration": this.duration,
                
                "position": this.pos,
                "dissolve": this.dis,
                "rotation": this.rot,
                "dissolveArrow": this.disa,
                "definitePosition": this.defpos,
                "scale": this.scale,
                "color": this.color
              
            }
        })
    }
}

class assignPlayerToTrack {
    constructor(settings = { time: 0, track: "track"}) {
        this.b = settings.time
        this.d = { "track": settings.track }
    }

    push() {
        diff.customData.customEvents.push({ 
            "b": this.b,
            "t": "AssignPlayerToTrack",
            "d": this.d
         })
    }
}

class assignPathAnimation {
    constructor(settings = {
    time: 0, 
    duration: 10,
    track: "track",
    animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]],
    animateDissolve: [[0, 0], [0, 1]], 
    animateDissolveArrow: [[1, 0], [1, 1]], 
    animateDefinitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], 
    animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]],
    animateColor: [[1, 1, 1, 0], [1, 1, 1, 1]]
    }) {
        if(!settings.time) { this.b = 0 } else { this.b = settings.time }
        this.t = "AssignPathAnimation"

        this.d = { "track": settings.track, "duration": settings.duration, "position": settings.animatePosition, "dissolve": settings.animateDissolve, "dissolveArrow": settings.animateDissolveArrow, 
        "definitePosition": settings.animateDefinitePosition,
        "scale": settings.animateScale,
        "color": settings.animateColor
        }
    }

    push() {
        diff.customData.customEvents.push(this)
    }
}



class assignTrackParent {
    constructor(settings = { time: 0, childTracks: ["hello"], parentTrack: "howdy" }) {
        if(!settings.time) { this.b = 0 } else { this.b = settings.time }

        let child;
        let parent;

        if(!settings.childTracks) { child = "track" } else { child = settings.childTracks }
        if(!settings.parentTrack) { parent = "track" } else { parent = settings.parentTrack }

        this.d = { "childTracks": child, "parentTrack": parent }
    }

    push() {
        diff.customData.customEvents.push(this)
    }
}



const lightValues = {
    on: 5,
    off: 0,
    fade: 7,
    flash: 6
}

 class lightEvent {
    constructor(settings = { time: 0, type: 0 | lightTypes, value: 1, floatValue: 1.0, color: [1, 1, 1, 1], lightID: 100 }) {
        if(!settings.time) { this.b = 0 } else { this.b = settings.time }

        if(!settings.type) {
            this.et = 0
        } else {
            this.et = settings.type
        }

        if(!settings.value) {
            this.i = 1
        } else {
            this.i = settings.value
        }

        if(!settings.floatValue) {
            this.f = 1.0
        } else {
            this.f = settings.floatValue
        }

        this.customData = { "color": settings.color, "lightID": settings.lightID }
    }

    push() {
        diff.basicBeatmapEvents.push(this)
    }
}

class Regex {

    string = ""

    constructor(init = "bruh") { if (init) this.regex = init }

    start() { this.regex += "\\]"; return this }



    add(string = "string") { 
        this.regex += string; return this 
    }

    vary(ammt = 0) {
        if (number === undefined) this.regex += "(|\\s\\(\\d*\\))";
        else {
            if (number === 0) this.regex += "";
            else this.regex += ` \\(${number}\\)`
        }
        return this;
    }

    separate(number = 0) {
        if (number === undefined) this.regex += "\\.\\[\\d*\\]";
        else this.regex += `\\.\\[${number}\\]`;
        return this;
    }

    end() { return this.regex + "$" }

}

class staticFog {
    constructor(settings= { attenuation: 0, offset: 0, startY: 0, height: 0 }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }
        this.attenuation = settings.attenuation
        this.offset = settings.offset
        this.startY = settings.startY
        this.height = settings.height
    }
    push() {
        diff.customData.environment.push({
            "id": "[0]Environment",
            "lookupMethod": "EndsWith",
            "components": {
                "BloomFogEnvironment": {
                    "attenuation": this.attenuation,
                    "offset": this.offset,
                    "startY": this.startY,
                    "height": this.height
                }
            }
        })
    }
}


class cinemaScreen {
    constructor(settings = { videoID: "id", videoFile: "hi", position: [0, 0, 0], rotation: [0, 0, 0], duration: 10, loop: false, height: 10, transparency: false, bloom: 0, curvature: 0}) {
        const file = JSON.parse(fs.readFileSync("cinema-video.json", 'utf8'))

        if(!settings.videoID) { this.videoID = file.videoID } else { this.videoID = settings.videoID }
        this.title = file.title
        this.author = file.author
        if(!settings.videoFile) { this.videoFile = file.videoFile } else { this.videoFile = settings.videoFile }
        this.duration = settings.duration
        this.screenPosition = { "x": settings.position[0], "y": settings.position[1], "z": settings.position[2] }
        this.screenRotation = { "x": settings.rotation[0], "y": settings.rotation[1], "z": settings.rotation[2] }
        this.loop = settings.loop
        this.screenHeight = settings.height
        this.transparency = settings.transparency
        this.bloom = settings.bloom
        this.screenCurvature  = settings.curvature
    }

    push() {
        fs.writeFileSync("cinema-video.json", JSON.stringify(this, null, 4))
    }
}

function notesBetween(time, timeEnd, forNote = (n: Note) => n) {
    diff.colorNotes.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })

    diff.customData.fakeColorNotes.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })
    
    diff.sliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })

    diff.customData.fakeSliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })
    
    diff.burstSliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })

    diff.customData.fakeBurstSliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })
}

function arcsBetween(time, timeEnd, forNote = (n = Note) => n) {
    diff.sliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })

    diff.customData.fakeSliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })
}

function chainsBetween(time, timeEnd, forNote = (n = Note) => n) {
    diff.burstSliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })

    diff.customData.fakeBurstSliders.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forNote(n)
        }
    })
}

function wallsBetween(time, timeEnd, forWall = (n = Wall) => n) {
    diff.obstacles.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forWall(n)
        }
    })

    diff.customData.fakeObstacles.forEach(n => {
        if(n.b >= time && n.b <= timeEnd) {
            forWall(n)
        }
    })
}

function bloqsBetween(time, timeEnd, forNote = (n = Note) => n) {
    diff.colorNotes.forEach(x => { if(x.b >= time && x.b <= timeEnd) {
        forNote(x)
    }})
    diff.customData.fakeColorNotes.forEach(x => { if(x.b >= time && x.b <= timeEnd) {
        forNote(x)
    }})
}

const ease = {
    Step: "easeStep",
    Spline: "splineCatmullRom",
    In: {
        sine: "easeInSine",
        quad: "easeInQuad",
        cubic: "easeInCubic",
        quart: "easeInQuart",
        quint: "easeInQuint",
        expo: "easeInExpo",
        circ: "easeInCirc",
        back: "easeInBack",
        elastic: "easeInElastic",
        bounce: "easeInBounce"
    },

    Out: {
        sine: "easeOutSine",
        quad: "easeOutQuad",
        cubic: "easeOutCubic",
        quart: "easeOutQuart",
        quint: "easeOutQuint",
        expo: "easeOutExpo",
        circ: "easeOutCirc",
        back: "easeOutBack",
        elastic: "easeOutElastic",
        bounce: "easeOutBounce"
    },

    inOut: {
        sine: "easeInOutSine",
        quad: "easeInOutQuad",
        cubic: "easeInOutCubic",
        quart: "easeInOutQuart",
        quint: "easeInOutQuint",
        expo: "easeInOutExpo",
        circ: "easeInOutCirc",
        back: "easeInOutBack",
        elastic: "easeInOutElastic",
        bounce: "easeInOutBounce"
    }
}

const character = {
    Standard: "Standard",
    Lawless: "Lawless"
}

const diffPath = {
    ExpertPlus: {
        Standard: "ExpertPlusStandard",
        Lawless: "ExpertPlusLawless"
    },
    Expert: {
        Standard: "ExpertStandard",
        Lawless: "ExpertLawless"
    },
    Hard: {
        Standard: "HardStandard",
        Lawless: "HardLawless"
    },
    Normal: {
        Standard: "NormalStandard",
        Lawless: "NormalLawless"
    },
    Easy: {
        Standard: "EasyStandad",
        Lawless: "LawlessStandard"
    }
}

class animateFog {
    /**
     * animate the fog in an environment without an animate track
     * @param { { } } settings the modifiers for your animated fog
     */
    constructor(settings = { time: number, duration: number, attenuation: [[0, 0]], offset: [[0,0]], height: [[1,1]] }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }
        if(!settings.duration) { this.duration = 10 } else { this.duration = settings.duration }
        this.attenuation = settings.attenuation
        this.trackAdd = Math.random() * 16
        this.offset = settings.offset
        this.height = settings.height
    }
    /**push the fog animation to the difficulty */
    push() {
        diff.customData.customEvents.push(
        {
            "b": this.time,
            "t": "AnimateTrack",
            "d": {
                "track": `fog${this.trackAdd}`,
                "duration": this.duration,
                "attenuation": this.attenuation,
                "height": this.height,
                "offset": this.offset
            }
        },             
        {
            "b": this.time,
            "t": "AssignFogTrack",
            "d": {
                "track": `fog${this.trackAdd}`
            }
        })
    }
}

const shader = {
    standard: "Standard",
    transparentLight: "TransparentLight",
    opaqueLight: "OpaqueLight",
    billieWater: "BillieWater",
    waterfallMirror: "WaterfallMirror",
    interscopeCar: "InterscopeCar",
    interscopeConcrete: "InterscopeConcrete"
}

const Shape = {
    cube: "Cube",
    capsule: "Capsule",
    triangle: "Triangle",
    cylinder: "Cylinder"
}

module.exports = {
    Map: Map,
    Note: Note,
    Wall: Wall,
    Bomb: Bomb,
    Environment: Environment,
    Geometry: Geometry,
    modelToWall: modelToWall,
    modelToEnvironment: modelToEnvironment,
    modeltoGeometry: modeltoGeometry,
    animateTrack: animateTrack,
    assignPathAnimation: assignPathAnimation,
    assignPlayerToTrack: assignPlayerToTrack,
    assignTrackParent: assignTrackParent,
    lightEvent: lightEvent,
    staticFog: staticFog,
    animateFog: animateFog,
    notesBetween: notesBetween,
    arcsBetween: arcsBetween,
    chainsBetween: chainsBetween,
    wallsBetween: wallsBetween,
    cinemaScreen: cinemaScreen,
    Regex: Regex,
    lightValues: lightValues,
    lightTypes: lightTypes,
    lookup: lookup,
    ease: ease,
    character: character,
    r: r,
    diff: diff,
    JSMlog: JSMlog,
    animateFog: animateFog,
    Shader: shader,
    Shape: Shape
}
