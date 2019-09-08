import DateMacros from './date-macros';
import global from '../global-variables';
export default class SingleDayServing extends DateMacros{
    constructor(time = null, fats = 0, carbs = 0, proteins = 0){
        super(fats, carbs, proteins, time);
        this.totalMacrosId = global.totalMacros.keyFromDate;//set total macros Id to the current total macros's date so we can track x/totals
        this.servings = []; //array of Serving
    }
    addServing(serving){
        this.servings.push(serving);
        let [f,c,p] = DateMacros.returnTotalMacros(serving.fats, serving.carbs, serving.proteins, serving.servingQuantity);
        this.fats += f;
        this.carbs += c;
        this.proteins += p;
    }

    //when saving, save only important information!
    returnObjectForSave(){
       return { 
            fats:this.fats,
            carbs:this.carbs,
            proteins:this.proteins,
            totalMacrosId:this.totalMacrosId,
            servings:this.servings,
            time: this.literal
        }
    }
}