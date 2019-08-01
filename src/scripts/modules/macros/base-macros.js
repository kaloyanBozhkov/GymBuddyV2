export default class BaseMacros{
    constructor(fats, carbs, proteins){
        this.fats = fats;
        this.carbs = carbs;
        this.proteins = proteins;
    }
    calculateCalories(){
        return ((parseFloat(this.fats) * 9) + (parseFloat(this.carbs) + parseFloat(this.proteins)) * 4);
    }
}