var Airplane = /** @class */ (function () {
    function Airplane() {
    }
    Airplane.prototype.fly = function (speed) {
        console.log("Speed is: ", speed);
    };
    Airplane.prototype.land = function () {
        return true;
    };
    return Airplane;
}());
var Kite = /** @class */ (function () {
    function Kite() {
    }
    Kite.prototype.fly = function (speed) {
        console.log("Speed is: ", speed);
    };
    Kite.prototype.land = function () {
        return true;
    };
    return Kite;
}());
var Bird = /** @class */ (function () {
    function Bird() {
    }
    Bird.prototype.fly = function (speed) {
        console.log("Speed is: ", speed);
    };
    Bird.prototype.land = function () {
        return true;
    };
    return Bird;
}());
function createFly() {
    var randNum = getRandomInt(0, 2);
    var tempObj;
    switch (randNum) {
        case 0: {
            tempObj = new Bird();
            break;
        }
        case 1: {
            tempObj = new Airplane();
            break;
        }
        case 2: {
            tempObj = new Kite();
            break;
        }
    }
    return tempObj;
}
var tempArr = new Array(10);
for (var i = 0; i < tempArr.length; i++) {
    tempArr[i] = createFly();
    tempArr[i].fly(10);
    console.log(tempArr[i].land());
}
//stackoverflow:
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
