import BaseMacros from './base-macros';
export default class FavoriteItem extends BaseMacros{
    constructor(fats, carbs, proteins, title, grams){
        super(fats, carbs, proteins);
        this.title = title;
        this.grams = grams;
    }
}