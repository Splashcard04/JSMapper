# JSMapper
![untitled](https://user-images.githubusercontent.com/111317032/212550210-99e92ce4-ef56-4a60-85f5-05ae330e8d9c.png)

# Notes and Faqs
* JSMapper is intended for users with little to medium amounts of coding experience, if you have any experience with typescript or are slightly more experienced in coding, I woud reccommend [ReMapper](https://github.com/swifter1243/remapper)
* All utils, classes and functions are currently contained in the script.js file, this will hopefully be adressed in a future update but for now - I will tell you how to minimize all the classes and functions so that they are less annoying



# Minimizing functions
before making changes to the script, select everything in it (ctrl + a) then press ctrl + shift + p and search for `Create Manual Folding Range From Selection`

![image](https://user-images.githubusercontent.com/111317032/212550971-35b1daea-279d-497e-af91-9af4b5100759.png)

 click on it and all of the src code will be folded and much less annoying
 
 # Getting Started
 This section of the docs will cover each class and function with examples, make sure to start your code **AFTER** the folded source code
 ## Initializing a map
 ```js
 const eyelids = new Map("ExpertPlusLawless.dat", "ExpertPlusStandard.dat")
 ```
 
## Writing data to a map
**After** all of your changes (function and class calls and the such) put at the end
```js
eyelids.save()
```
remember that you can replace the map variable, eyelids just happens to be the name of my map
# Objects 
## Notes
```js
new Note({
    time: 0,
    type: 1,
    animateColor: [
        [0, 0, 0, 0], [3, 0, 0, 1]
    ]
}).push()
```
this will create a new note at beat 0 with type 1, animating the color from black to red across its life
### Params
`time`: `number` - the beat that the not will start on

`type`: `number(0-1)` - the type (red or blue) of the note

`cutDirection`: `number(0-8)` - the direction the note is to be cut

`angleOffset`: `number` - the offset of the notes cut direction angle
