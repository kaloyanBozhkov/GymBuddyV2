import DateMacros from './date-macros';
export default class Serving extends DateMacros{
    constructor(fats, carbs, proteins, time, itemName = "New Item", servingSize, servingQuantity){
        super(fats, carbs, proteins, time);
        this.itemName = itemName;
        this.servingSize = servingSize;
        this.servingQuantity = servingQuantity;
    }
} 