interface IFly {
  fly(speed: number): void;
  land(): boolean;
}

class Airplane implements IFly{

  pilot:string;
  airline:string;
  destination:string;

  public fly(speed: number): void{

    console.log("Speed is: ",speed);

  }

  public land(): boolean{

    return true;

  }

}

class Kite implements IFly{

  color:string;
  price:number;
  destination:string;

  public fly(speed: number): void{

    console.log("Speed is: ",speed);

  }

  public land(): boolean{

    return true;

  }

}

class Bird implements IFly{

  type:string;
  age:number;
  color:string;

  public fly(speed: number): void{

    console.log("Speed is: ",speed);

  }

  public land(): boolean{

    return true;

  }

}

function createFly():any{

  let randNum:number = getRandomInt(0,2);

  let tempObj:IFly;

  switch(randNum){
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

let tempArr: IFly[] = new Array<IFly>(10);
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
