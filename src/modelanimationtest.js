const { diffieHellman } = require("crypto")
const fs = require(`fs`)


class lightGradient {
    constructor( settings = {} ) {
        this.time = settings.time
        this.end = settings.timeEnd
        this.type = settings.type
        this.value = settings.value
        this.floatValue = settings.floatValue

        this.startColor = settings.startColor
        this.endColor = settings.endColor

        this.interval = settings.interval
    }

    push() {
        for(let i = 0; i < this.interval; i++) {
            diff.basicBeatmapEvents.push({
                "b": this.time,
                "et": this.type,
                "i": this.value,
                "f": this.floatValue
            })
        }
    }
}