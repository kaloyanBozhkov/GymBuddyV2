import DateMacros from './date-macros';
import global from '../global-variables';

//when saving single day serving's servings, make sure only important properties are copied
const returnImportantPropertiesFromServingsObject = ({fats, carbs, proteins, servingQuantity, servingSize, itemName, literal}) => ({fats, carbs, proteins, servingQuantity, servingSize, itemName, time: literal})

export default class SingleDayServing extends DateMacros{
    constructor(time = null, fats = 0, carbs = 0, proteins = 0, servings = []){
        super(fats, carbs, proteins, time);
        this.totalMacrosId = global.totalMacros.keyFromDate;//set total macros Id to the current total macros's date so we can track x/totals
        this.servings = servings; //array of Serving
    }

    addServing(serving){
        this.servings.push(serving);
        this.addMacros(...DateMacros.returnTotalMacros(serving.fats, serving.carbs, serving.proteins, serving.servingQuantity))
    }

    removeServing(servingToRemove){//make sure object reference is same so equality works!
        this.servings = this.servings.filter(x => x != servingToRemove);
        this.subtractMacros(...DateMacros.returnTotalMacros(servingToRemove.fats, servingToRemove.carbs, servingToRemove.proteins, servingToRemove.servingQuantity));
    }

    //when saving, save only important information! JSON stringify will call this first ;)
    toJSON(){
        let dateMacroProperties = DateMacros.prototype.toJSON.call(this);
        return { 
            ...dateMacroProperties,
            totalMacrosId:this.totalMacrosId,
            servings:this.servings.reduce((acc, s)=> [...acc, returnImportantPropertiesFromServingsObject(s)], [])
        }
    }
}