const fs = require(`fs`)

/*
    TO DO: 
    Chains,
    arcs
*/

let diff

class Map {
    constructor(input = "ExpertPlusLawless.dat", output = "ExpertPlusStandard.dat") {
        diff = JSON.parse(fs.readFileSync(input))
        this.out = output
        diff.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [] }
    }

    save() {
        fs.writeFileSync(this.out, JSON.stringify(diff, null, 4))
    }
}







 class Note {
    constructor(settings = { time: 0, type: 0, cutDirection: 0, angleOffset: 0, worldRotation: [0, 0, 0], animateRotation: [0, 0, 0], njs: 8, timeOffset: 0, interactable: false, color: [1, 1, 1, 1], track: "track", dissolve: [[0, 0], [0, 1]], dissolveArrow: [[1, 0], [1, 1]], animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]], track: "track" }) {
        if(!settings.time) { this.b = 0 } else { this.b = settings.time }
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
    constructor(settings = { time: 0, position, duration, width, height, color, scale, definitePosition, animateRotation, animateLocalRotation, worldRotation, njs, timeOffset, interactable, dissolve, track: "track" }) {
        this.b = settings.time
        this.x = 0
        this.y = 0

        if(!settings.duration) {
            this.d = 10
        } else {
            this.d = settings.duration
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
        "animation": { "dissolve": settings.dissolve, "definitePosition": settings.definitePosition, "localRotation": settings.localRotation, "rotation": settings.rotation } }

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
    constructor(settings = { time: 0, position: [0, 0], worldRotation: [0, 0, 0], localRotation: [0, 0, 0, 0], rotation: [0, 0, 0], njs: 8, timeOffset: 0, interactable: true, color: [1, 1, 1, 1], track: "track", dissolve: [[0, 0], [0, 1]], animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], scale: [[1, 1, 1, 0], [1, 1, 1, 1]], animateColor: [[0, 0, 0, 0], [0, 0, 0, 1]] }) {
        if(!settings.time) { this.b = 0 } else { this.b = settings.time }

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
    constructor(settings = { id, lookup: string = "Contains" | "Regex" | "Exact", position, scale, rotation, duplicate, active, localPosition, localRotation, track, lightID, lightType }) {
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
        if(this.Ilight === true) {
            diff.customData.environment.push(this)
        }
    }
}

class Geometry {
    constructor(settings = { type: "Cube", material: { color: [0, 0, 0, 0], shader: "Standard", shaderKeywords: [], track: "track" }, scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }) {
        
        let material;
        let type;
        if(!settings.material) { material = { shader: "Standard" } } else { material = settings.material }
        if(!settings.type) { type = "Cube" } else { type = settings.type }

        this.geometry = { "type": type, "material": material }

        this.scale = settings.scale
        this.position = settings.position
        this.rotation = settings.rotation
    }

    push() {
        diff.customData.environment.push(this)
    }
}

class modelToWall {
    constructor(path = "path") {
        this.path = JSON.parse(fs.readFileSync(path+".rmmodel", 'utf8'))
        const objects = this.path.objects

        objects.forEach(obj => {
            diff.fakeObstacles.push({
                "b": 0,
                "x": 1,
                "y": 0,
                "d": 100,
                "w": 1,
                "h": 3,
                "customData": {
                    "size": obj.scale,
                    "animation": {
                        "definitePosition": obj.pos,
                        "localRotation": obj.rot
                    }
                }
            })
        })
    }
}

class modelToEnvironment {
    constructor(path, settings = { id: "Environment", lookup: "Contains" }) {
        this.file = JSON.parse(fs.readFileSync(path+".rmmodel", 'utf8'))

        if(!settings.id) {
            this.id = "Environment"
        } else {
            this.id = settings.id
        }

        if(!settings.lookup) {
            this.lookup = "Contains"
        } else {
            this.lookup = settings.lookup
        }
    }

    push() {
        const objects = this.file.objects
        objects.forEach(obj => {
            diff.customData.environment.push({
                "id": this.id,
                "lookupMethod": this.lookup,
                "position": obj.pos,
                "localRotation": obj.rot,
                "scale": obj.scale
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
    constructor(settings = { time: 0, track: "track", 
    animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]],
    animateDissolve: [[0, 0], [0, 1]], 
    animateDissolveArrow: [[1, 0], [1, 1]], 
    animateDefinitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], 
    animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]],
    animateColor: [[1, 1, 1, 0], [1, 1, 1, 1]]
    }) {
        if(!settings.time) { this.b = 0 } else { this.time = settings.time }


        this.pos = settings.animatePosition
        this.dis = settings.animateDissolve
        this.disa = settings.animateDissolveArrow
        this.defpos = settings.animateDefinitePosition
        this.scale = settings.animateScale
        this.color = settings.animateColor

        this.d = { "animation": { "position": settings.animatePosition, "dissolve": settings.animateDissolve, "dissolveArrow": settings.animateDissolveArrow, 
        "definitePosition": settings.animateDefinitePosition, "scale": settings.animateScale, "color": settings.animateColor
        }}
    }

    push() {
        diff.customData.customEvents.push({
            "b": this.time,
            "t": "AnimateTrack",
            "d": {
                "animation": {
                    "position": this.pos,
                    "dissolve": this.dis,
                    "dissolveArrow": this.disa,
                    "definitePosition": this.defpos,
                    "scale": this.scale,
                    "color": this.color
                }
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
        diff.customData.customEvents.push(this)
    }
}

class assignPathAnimation {
    constructor(settings = {time: 0, 
    animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]],
    animateDissolve: [[0, 0], [0, 1]], 
    animateDissolveArrow: [[1, 0], [1, 1]], 
    animateDefinitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], 
    animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]],
    animateColor: [[1, 1, 1, 0], [1, 1, 1, 1]]
    }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }

        this.d = { "animation": { "position": settings.animatePosition, "dissolve": settings.animateDissolve, "dissolveArrow": settings.animateDissolveArrow, 
        "definitePosition": settings.animateDefinitePosition,
        "scale": settings.animateScale,
        "color": settings.animateColor
        }}
    }

    push() {
        diff.customData.customEvents.push(this)
    }
}

class assignFogTrack {
    constructor(settings = { time: 0, offset: [[0, 0, 0, 0]], attenuation: [[0, 0, 0, 0]], track: "track" }) {
        this.b = settings.time

        let animation = { "offset": settings.offset, "attenuation": settings.attenuation }
        this.d = { "track": settings.track, "animation": animation}
    }

    push() {
        diff.customData.customEvents.push(this)
    }
}


class Fog {
    constructor(settings= { attenuation: 0 }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }
        if(!settings.attenuation) { this.attenuation = 0 } else { this.attenuation = settings.attenuation }
    }
    push() {
        diff.customData.environment.push({
            "id": "[0]Environment",
            "lookupMethod": "EndsWith",
            "components": {
                "BloomFogEnvironment": {
                    "attentuation": this.attenuation
                }
            }
        })
    }
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

        this.customData = { "color": settings.color, "lightID": settings.color }
    }

    push() {
        diff.basicBeatmapEvents.push(this)
    }
}



