class Asset {


    constructor() {
        this._id;
        this._type;
        this._fullAddress = {};
        this._price;
        this._roomsNumber;
    }

    //////////////////////

    set id(random_value) {

        console.log(random_value);
        
        if (this.isValidName(random_value))
            this._id = random_value;
        else
            throw new Error(`id must be a string!`);
    }


    get id() {
        return this._id
    }

    set price(value) {
        
        if (this.isValidNumber(value))
            this._price = value;
        else
            throw new Error(`Asset price must be a number and greater than zero!`);
    }


    get price() {
        return this._price
    }

    set roomsNumber(value) {
        
        if (this.isValidNumber(value))
            this._roomsNumber = value;
        else
            throw new Error(`Rooms number must be a number and greater than zero!`);
    }


    get roomsNumber() {
        return this._roomsNumber
    }

    set fullAddress(values_obj) {

        let errors = [];

        if( values_obj.length == 3){ // Will check if the values_obj has all the properties

            values_obj = {city : values_obj[0], street:values_obj[1], streetNumber:values_obj[2] }; // filter

            // city: values_obj.city
            // street: values_obj.street
            // street number: values_obj.streetNumber

            if (this.isValidName( values_obj.city)){ // We have the right property with the right validation

                this.fullAddress["city"] = values_obj.city;
    
            }else{
    
                errors.push("City of the assest must be in string format and not a number!")
    
            }

            
            if (this.isValidName( values_obj.street)){// We have the right property with the right validation

                this.fullAddress["street"] = values_obj.street;
    
            }else{
    
                errors.push("Street of the assest must be in string format and not a number!")
    
            }

            if (this.isValidNumber(values_obj.streetNumber)){// We have the right property with the right validation
                this.fullAddress["streetNumber"] = values_obj.streetNumber;
            }else{
                errors.push(`Street number must be a number and greater than zero!`);
            }

        }else{ 

            errors.push("You must send an object of asset address that will include: city:string, street: string, streetNumber: integer")

        }

        if( errors.length > 0){

            throw new Error(errors);

        }
            
    }

    get fullAddress() {
        return this._fullAddress
    }

    set type(value) {
        
        if (value && isNaN(value) && value != "")
            this._type = value;
        else
            throw new Error(`Type must be a string!`);
    }


    get type() {
        return this._type
    }

    isValidNumber(value){

        return (value && value != "" && !isNaN(value) && value > 0)

    }

    isValidName(name){


        return (name && name != "" && isNaN( name) )

    }

}


module.exports={
    "AssetClassPointer":Asset
};