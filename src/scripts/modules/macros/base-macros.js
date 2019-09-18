import {round} from '../common/utilities';
export default class BaseMacros{
    constructor(fats = 0, carbs = 0, proteins = 0){
        this.fats = round(fats);
        this.carbs = round(carbs);
        this.proteins = round(proteins);
    }

    addMacros(f,c,p){
        this.fats = round(f + this.fats);//avoid binary floating point issues eg 0.1 + 0.2 === 0.3 //false
        this.carbs = round(c + this.carbs);
        this.proteins = round(p + this.proteins);
    }

    subtractMacros(f,c,p){
        this.fats = round(this.fats - f);//avoid binary floating point issues eg 0.3 - 0.1 === 0.2 //false
        this.carbs = round(this.carbs - c);
        this.proteins = round(this.proteins - p);
    }

    toJSON(){
        return{
            fats: this.fats,
            carbs: this.carbs,
            proteins: this.proteins,
        }
    }

    static returnGrams(percentage, total, caloriePerGram){
        return (round((total * percentage / 100 / caloriePerGram) * 100) / 100);
    }

    static returnMacrosParsedAndRounded(...fcp){//returns fats, carbs proteins 
        return fcp.reduce((acc, i) => [...acc, round(parseFloat(i || 0))],[]);
    }

    static returnCaloriesForMacros(fats,carbs,proteins){
        return [fats * 9, carbs * 4, proteins * 4];
    }

    static returnTotalCalories(fats, carbs, proteins){//calories always round, no need to show half calories! 
        return Math.round(this.returnCaloriesForMacros(fats,carbs,proteins).reduce((totalCalories, macroCalories)=> (totalCalories + macroCalories), 0));
    }

    static returnTotalMacros(fats, carbs, proteins, quantity){
        return this.returnMacrosParsedAndRounded(fats,carbs,proteins).reduce((acc, m) => [...acc, round(m * quantity)], []);
    }

    static returnCaloricStats(fats, carbs, proteins, quantity, skipTotalCalories = false){//returns macros and calories as [totalFats, totalCarbs, totalProteins, totalCalories]
        let fcp = this.returnMacrosParsedAndRounded(fats,carbs,proteins).reduce((totMacros, m) => [...totMacros, round(m * quantity)], []);
        return (skipTotalCalories ? fcp : [...fcp, this.returnTotalCalories(...fcp)]);
    }
}