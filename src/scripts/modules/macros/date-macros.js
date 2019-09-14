import BaseMacros from './base-macros';
import getCurrentTime from '../common/get-current-time';
export default class DateMacros extends BaseMacros{
    constructor(fats = 0, carbs = 0, proteins = 0, time = null){
        super(fats, carbs, proteins);
        let timeObj = time ? getCurrentTime(0, time) : getCurrentTime();
        this.literal = timeObj.literal;
        this.day = timeObj.day;
        this.month = timeObj.month;
        this.year = timeObj.year;
        this.keyFromDate = timeObj.keyFromDate;
        //could have looped throuhg all timeObj keys and set this[property] = to values though, there are useless properties storage-wise
    }
    //when saving, save only important information!
    returnDateMacrosObjectForSave(){
        let baseMacrosObj = this.returnBaseMacrosObjectForSave();
        return { 
            ...baseMacrosObj,
            time:this.literal
        }
    }
}