import {round} from '../common/utilities';
export default class BaseMacros{
    constructor(fats, carbs, proteins){
        this.fats = round(fats);
        this.carbs = round(carbs);
        this.proteins = round(proteins);
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

    static returnTotalCalories(fats, carbs, proteins){
        return round(this.returnCaloriesForMacros(fats,carbs,proteins).reduce((totalCalories, macroCalories)=> (totalCalories + macroCalories), 0));
    }

    static returnTotalMacros(fats, carbs, proteins, quantity){
        return this.returnMacrosParsedAndRounded(fats,carbs,proteins).reduce((acc, m) => [...acc, round(m * quantity)], []);
    }

    static returnCaloricStats(fats, carbs, proteins, quantity, skipTotalCalories = false){//returns macros and calories as [totalFats, totalCarbs, totalProteins, totalCalories]
        let fcp = this.returnMacrosParsedAndRounded(fats,carbs,proteins).reduce((totMacros, m) => [...totMacros, round(m * quantity)], []);
        return (skipTotalCalories ? fcp : [...fcp, this.returnTotalCalories(...fcp)]);
    }
}