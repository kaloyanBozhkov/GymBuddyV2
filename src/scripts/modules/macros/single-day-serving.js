import DateMacros from './date-macros';
import getCurrentTime from '../common/get-current-time';
import {round} from '../common/utilities';
import global from '../global-variables';
export default class SingleDayServing extends DateMacros{
    constructor(time = null, fats = 0, carbs = 0, proteins = 0){
        super(fats, carbs, proteins, time);
        this.totalMacrosId = global.totalMacros.keyFromDate;//set total macros Id to the current total macros's date so we can track x/totals
        this._servings = []; //array of Serving
    }
    //not using get or set (getter/setter) since I am copying these functions over after JSON stirngify and parse happens
    setServings(servings, reset = false){
        if(reset)
            this._servings = [];

        for(let serving of servings)
            this.addServing(serving);
    }    
    getServings(){
        return this._servings;
    }
    addServing(serving){
        this._servings.push(serving);
        this.fats += round(serving.fats * serving.servingQuantity);
        this.carbs += round(serving.carbs * serving.servingQuantity);
        this.proteins += round(serving.proteins * serving.servingQuantity);
    }
}