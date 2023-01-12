const fs = require(`fs`)

/*
    TO DO: 
    Chains,
    arcs
*/

const input = "ExpertPlusLawless.dat"
const output = "ExpertPlusStandard.dat"
const diff = JSON.parse(fs.readFileSync(input, 'utf8'))

diff.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [] }

class Note {
    constructor(settings = { time: 0, type: 0 | 1, cutDirection: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 , angleOffset: 0, fake: false, position: [0, 0], worldRotation: [0, 0, 0], rotation: [0, 0, 0], njs: 8, timeOffset: 0, interactable: true, color: [1, 1, 1, 1], track: "track", dissolve: [[0, 0], [0, 1]], dissolveArrow: [[1, 0], [1, 1]], animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]] }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }
        if(!settings.angleOffset) { this.angleOffset = 0 } else { this.angleOffset = settings.angleOffset } 

        if(!settings.cutDirection) {
            this.cutDirection = 0
        } else {
            this.cutDirection = settings.cutDirection
        }

        if(!settings.fake) { this.fake = false } else { this.fake = settings.fake }

        this.position = settings.position
        this.rotation = settings.worldRotation
        this.localRotation = settings.localRotation
        this.njs = settings.njs
        this.timeOffset = settings.timeOffset
        this.track = settings.track

        if(!settings.interactable) {
            this.uninteractable = false
        } else {
            if(settings.interactable === true) {
                this.uninteractable = false
            } else {
                this.uninteractable = true
            }
        }

        this.color = settings.color

        this.dissolve = settings.dissolve
        this.dissolveArrow = settings.dissolveArrow
        this.animatePosition = settings.animatePosition
        this.definitePosition = settings.definitePosition
        this.scale = settings.scale
    }

    push() {
        if(this.fake === true) {
            diff.customData.fakeColorNotes.push({
                "b": this.time,
                "x": 0,
                "y": 0,
                "c": this.cutDirection,
                "a": this.angleOffset,
                "customData": {
                    "coordinates": this.position,
                    "worldRotation": this.rotation,
                    "localRotation": this.localRotation,
                    "noteJumpMovementSpeed": this.njs,
                    "noteJumpStartBeatOffset": this.timeOffset,
                    "uninteractable": this.uninteractable,
                    "track": this.track,
                    "animation": {
                        "color": this.color,
                        "dissolve": this.dissolve,
                        "dissolveArrow": this.dissolveArrow,
                        "position": this.animatePosition,
                        "definitePosition": this.definitePosition,
                        "scale": this.scale
                    }
                }
            })
        } else {
            diff.colorNotes.push({
                "b": this.time,
                "x": 0,
                "y": 0,
                "c": this.cutDirection,
                "a": this.angleOffset,
                "customData": {
                    "coordinates": this.position,
                    "worldRotation": this.rotation,
                    "localRotation": this.localRotation,
                    "noteJumpMovementSpeed": this.njs,
                    "noteJumpStartBeatOffset": this.timeOffset,
                    "uninteractable": this.uninteractable,
                    "track": this.track,
                    "animation": {
                        "color": this.color,
                        "dissolve": this.dissolve,
                        "dissolveArrow": this.dissolveArrow,
                        "position": this.animatePosition,
                        "definitePosition": this.definitePosition,
                        "scale": this.scale
                    }
                }
            })
        }
    }
}



class Wall {
    constructor(settings = { time, position, duration, width, height, fake, color, scale, definitePosition, rotation, worldRotation, njs, timeOffset, interactable, dissolve }) {
        this.time = settings.time
        this.fake = settings.fake

        if(!settings.duration) {
            this.duration = 10
        } else {
            this.duration = settings.duration
        }

        if(!settings.width) {
            this.width = 1
        } else {
            this.width = settings.width
        }

        if(!settings.height) {
            this.height = 1
        } else {
            this.height = settings.height
        }

        if(!settings.position) {
            this.position = [0, 0]
        } else {
            this.position = settings.position
        }

        this.color = settings.color
        this.scale = settings.scale
        this.defPos = settings.definitePosition
        this.rotation = settings.rotation
        this.worldRotation = settings.worldRotation
        this.njs = settings.njs
        this.timeOffset = settings.timeOffset

        if(settings.interactable) {
            if(settings.interactable === true) {
                this.uninteractable = false
            } else {
                this.uninteractable = true
            }
        } else {
            this.uninteractable = false
        }

        this.dissolve = settings.dissolve

    }


    push() {
        if(this.fake) {
            diff.customData.fakeObstacles.push({
                "b": this.time,
                "x": 0,
                "y": 0,
                "d": this.duration,
                "w": this.width,
                "h": this.height,
                "customData": {
                    "color": this.color,
                    "size": this.scale,
                    "coordinates": this.position,
                    "worldRotation": this.worldRotation,
                    "noteJumpMovementSpeed": this.njs,
                    "noteJumpStartBeatOffset": this.timeOffset,
                    "uninteractable": this.uninteractable,
                    "animation": {
                        "definitePosition": this.defPos,
                        "localRotation": this.rotation,
                        "dissolve": this.dissolve
                    }
                }
            })
        } else {
            diff.obstacles.push({
                "b": this.time,
                "x": 0,
                "y": 0,
                "d": this.duration,
                "w": this.width,
                "h": this.height,
                "customData": {
                    "color": this.color,
                    "size": this.scale,
                    "coordinates": this.position,
                    "worldRotation": this.worldRotation,
                    "noteJumpMovementSpeed": this.njs,
                    "noteJumpStartBeatOffset": this.timeOffset,
                    "uninteractable": this.uninteractable,
                    "animation": {
                        "definitePosition": this.defPos,
                        "localRotation": this.rotation,
                        "dissolve": this.dissolve
                    }
                }
            })
        }
    }
}


class Bomb {
    constructor(settings = { time: 0, type: 0 | 1, fake: false, position: [0, 0], worldRotation: [0, 0, 0], rotation: [0, 0, 0], njs: 8, timeOffset: 0, interactable: true, color: [1, 1, 1, 1], track: "track", dissolve: [[0, 0], [0, 1]], animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], scale: [[1, 1, 1, 0], [1, 1, 1, 1]] }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }

        if(!settings.fake) { this.fake = false } else { this.fake = settings.fake }

        this.position = settings.position
        this.rotation = settings.worldRotation
        this.localRotation = settings.localRotation
        this.njs = settings.njs
        this.timeOffset = settings.timeOffset

        if(!settings.interactable) {
            this.uninteractable = false
        } else {
            if(settings.interactable === true) {
                this.uninteractable = false
            } else {
                this.uninteractable = true
            }
        }

        this.color = settings.color

        this.dissolve = settings.dissolve
        this.animatePosition = settings.animatePosition
        this.definitePosition = settings.definitePosition
        this.scale = settings.scale
    }

    push() {
        if(this.fake === true) {
            diff.customData.fakeBombNotes.push({
                "b": this.time,
                "x": 0,
                "y": 0,
                "customData": {
                    "coordinates": this.position,
                    "worldRotation": this.rotation,
                    "localRotation": this.localRotation,
                    "noteJumpMovementSpeed": this.njs,
                    "noteJumpStartBeatOffset": this.timeOffset,
                    "uninteractable": this.uninteractable,
                    "animation": {
                        "color": this.color,
                        "dissolve": this.dissolve,
                        "position": this.animatePosition,
                        "definitePosition": this.definitePosition,
                        "scale": this.scale
                    }
                }
            })
        } else {
            diff.bombNotes.push({
                "b": this.time,
                "x": 0,
                "y": 0,
                "customData": {
                    "coordinates": this.position,
                    "worldRotation": this.rotation,
                    "localRotation": this.localRotation,
                    "noteJumpMovementSpeed": this.njs,
                    "noteJumpStartBeatOffset": this.timeOffset,
                    "uninteractable": this.uninteractable,
                    "animation": {
                        "color": this.color,
                        "dissolve": this.dissolve,
                        "position": this.animatePosition,
                        "definitePosition": this.definitePosition,
                        "scale": this.scale
                    }
                }
            })
        }
    }
}

class Environment {
    constructor(settings = { id, lookup: string = "Contains" | "Regex" | "Exact", position, scale, rotation, duplicate, active, localPosition, localRotation, track, lightID, lightType }) {
        this.id = settings.id
        this.lookup = settings.lookup
        this.position = settings.position
        this.scale = settings.scale
        this.rotation = settings.rotation
        this.duplicate = settings.duplicate
        this.active = settings.active
        this.localPosition = settings.localPosition
        this.localRotation = settings.localRotation
        this.track = settings.track

        if(settings.lightID || settings.lightType) {
            this.lightID = settings.lightID
            this.lightType = settings.lightType

            this.Ilight = true
        }
    }

    push() {
        if(this.Ilight === true) {
            diff.customData.environment.push({
                "id": this.id,
                "lookupMethod": this.lookup,
                "position": this.position,
                "scale": this.scale,
                "rotation": this.rotation,
                "duplicate": this.duplicate,
                "active": this.active,
                "localPosition": this.localPosition,
                "localRotation": this.localRotation,
                "track": this.track,
                "components": {
                    "ILightWithId": {
                        "lightID": this.lightID,
                        "lightType": this.lightType
                    }
                }
            })
        } else {
            diff.customData.environment.push({
                "id": this.id,
                "lookupMethod": this.lookup,
                "position": this.position,
                "scale": this.scale,
                "rotation": this.rotation,
                "duplicate": this.duplicate,
                "active": this.active,
                "localPosition": this.localPosition,
                "localRotation": this.localRotation,
                "track": this.track,
            })
        }
    }
}

class Geometry {
    constructor(settings = { type: "Cube", material: { color: [0, 0, 0, 0], shader: "Standard", shaderKeywords: [], track: "track" }, scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }) {
        if(!settings.material) { this.material = { shader: "Standard" } } else { this.material = settings.material }
        if(!settings.type) { this.type = "Cube" } else { this.type = settings.type }

        this.scale = settings.scale
        this.position = settings.position
        this.rotation = settings.rotation
    }

    push() {
        diff.customData.environment.push({
            "geometry": {
                "type": this.type,
                "material": this.material
            },
            "scale": this.scale,
            "position": this.position,
            "rotation": this.rotation,
            "track": this.track
        })
    }
}

class modelToWall {
    constructor(path = "path") {
        this.path = JSON.parse(fs.readFileSync(path+".rmmodel", 'utf8'))
        const objects = this.path.objects

        objects.forEach(obj => {
            diff.obstacles.push({
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

class lightEvent {
    constructor(settings = { time: 0, type: 0 | lightTypes, value: 1, floatValue: 1.0, color: [1, 1, 1, 1], lightID: 100 }) {
        if(!this.time) { this.time = 0 } else { this.time = settings.time }

        if(!settings.type) {
            this.type = 0
        } else {
            this.type = settings.type
        }

        if(!settings.value) {
            this.value = 1
        } else {
            this.value = settings.value
        }

        if(!settings.floatValue) {
            this.floatValue = 1.0
        } else {
            this.floatValue = settings.floatValue
        }

        this.color = settings.color
        this.lightID = settings.lightID
    }

    push() {
        diff.basicBeatmapEvents.push({
            "b": this.time,
            "et": this.type,
            "i": this.value,
            "f": this.floatValue,
            "customData": {
                "color": this.color,
                "lightID": this.lightID
            }
        })
    }
}

class animateTrack {
    constructor(settings = { time: 0, type: "Animate Track", track: "track", 
    animatePosition: [[0, 0, 0, 0], [0, 0, 0, 1]],
    animateDissolve: [[0, 0], [0, 1]], 
    animateDissolveArrow: [[1, 0], [1, 1]], 
    animateDefinitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]], 
    animateScale: [[1, 1, 1, 0], [1, 1, 1, 1]],
    animateColor: [[1, 1, 1, 0], [1, 1, 1, 1]]
    }) {
        if(!settings.time) { this.time = 0 } else { this.time = settings.time }
        if(!settings.type) { this.type = " Animate Track" } else { this.type = settings.type }


        const anim = settings.animate
        const data = { anim }

        if(!settings.data) { this.d = {} } else { this.d = data }

        this.pos = settings.animatePosition
        this.dis = settings.animateDissolve
        this.disa = settings.animateDissolveArrow
        this.defpos = settings.animateDefinitePosition
        this.scale = settings.animateScale
        this.color = settings.animateColor
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
        this.time = settings.time
        this.track = settings.track
    }

    push() {
        diff.customData.customEvents.push({
            "b": this.time,
            "t": "AssignPlayerToTrack",
            "d": { "track": this.track }
        })
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

        this.pos = settings.animatePosition
        this.dis = settings.animateDissolve
        this.disa = settings.animateDissolveArrow
        this.defpos = settings.animateDefinitePosition
        this.scale = settings.animateScale
        this.color = settings.animateColor
    }

    push() {
        diff.customData.customEvents.push({
            "b": this.time,
            "t": "AssignPathAnimation",
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

class assignFogTrack {
    constructor(settings = { time: 0, offset: [[0, 0, 0, 0]], attenuation: [[0, 0, 0, 0]], track: "track" }) {
        this.time = settings.time
        this.offset = settings.offset
        this.attentuation = settings.attenuation
    }

    push() {
        diff.customData.customEvents.push({
            "b": this.time,
            "t": "AssignFogTrack",
            "d": {
                "track": this.track,
                animation: {
                    "offset": this.offset,
                    "attenuation": this.attentuation
                }
            }
        })
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


fs.writeFileSync(output, JSON.stringify(diff, null, 4))
