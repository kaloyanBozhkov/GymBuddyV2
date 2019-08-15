import {round} from '../common/utilities';
export default class BaseMacros{
    constructor(fats, carbs, proteins){
        this.fats = round(fats);
        this.carbs = round(carbs);
        this.proteins = round(proteins);
    }
    calculateCalories(){//calories should always be full
        return Math.round((parseFloat(this.fats) * 9) + (parseFloat(this.carbs) + parseFloat(this.proteins)) * 4);
    }
}