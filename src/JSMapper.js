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
            "t": "AnimateComponent",
            "d": {
                "track": `fog${this.trackAdd}`,
                "duration": this.duration,
                "BloomFogEnvironment": {
                    'attenuation': this.attenuation,
                    'offset': this.offset,
                    'height': this.height
                }
            }
        })
    }
}
