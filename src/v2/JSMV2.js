const fs = require(`fs`);

let diff = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"))
let outputFile;
let inputFile

class Map {
    /**
     * initialize a map in beatmaps v2
     * @param { string } input the input data file, WITHOUT the .dat file extension
     * @param { string } output the output data file WITHOUT the .dat file extension
     */
    constructor(input = "idk", output = "idk") {
        outputFile = output + ".dat"
        inputFile = input
        diff = JSON.parse(fs.readFileSync(input+".dat"))

        diff._customData = { _environment: [], _materials: { } }
    }

        /**
         * Save all changes to the specified output file
        */
    save() {
        fs.writeFileSync(outputFile, JSON.stringify(diff))
    }
}

class Note {
    /**
     * Create a new note at the beat specified
     * @param { number } time the beat to spawn the note
     * @param { {} } modifications the modifiers applied to the note, dissolve, color etc.
     */
    constructor(time = 0, modifications = 
    { 
        position: [0, 0],
        type: 0, 
        cutDirection: 0,
        rotation: [0, 0, 0],
        localRotation: [0, 0, 0],
        njs: 8,
        timeOffset: 0,
        fake: false,
        interactable: true,
        color: [1, 1, 1, 1],
        disableSpawnEffect: false,
        track: "track",

        animateColor: [[1, 1, 1, 1, 1]],
        animateDissolve: [[0, 0]],
        animateDissolveArrow: [[0, 0]],
        animateScale: [[1, 1, 1, 1]],
        animatePosition: [[0, 0, 0, 0]],
        animateLocalRotation: [[0, 0, 0, 1]],
        animateDefinitePosition: [[0, 0, 0, 0]]
    }) {
        if(!time) { this.time = 0 } else { this._time = time }
        let pos
        if(!modifications.position) { pos = [0, 0] } else { pos = modifications.pos }
        if(!modifications.type) { this._type = 0 } else { this._type = modifications.type }
        if(!modifications.cutDirection) { this._cutDirection = 0 } else { this._cutDirection = modifications.cutDirection }


        this._customData = { _position: pos, _rotation: modifications.rotation, _localRotation: modifications.localRotation,
            _noteJumpMovementSpeed: modifications.njs, _noteJumpStartBeatOffset: modifications.timeOffset,
            _fake: modifications.njs, _interactable: modifications.interactable, _color: modifications.color,
            _disableSpawnEffect: modifications.disableSpawnEffect, _track: modifications.track,
            _animation: {
                _color: modifications.animateColor, _dissolve: modifications.animateDissolve,
                _dissolveArrow: modifications.animateDissolveArrow, _scale: modifications.animateScale,
                _position: modifications.animatePosition, _localRotation: modifications.animateLocalRotation,
                _definitePosition: modifications.animateDefinitePosition
            }
        }
    }

    /** push the note to the difficulty file */
    push() {
        diff._notes.push(this)
    }
}