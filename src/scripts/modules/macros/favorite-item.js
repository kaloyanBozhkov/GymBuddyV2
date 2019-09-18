import BaseMacros from './base-macros';
export default class FavoriteItem extends BaseMacros{
    constructor(fats, carbs, proteins, title, grams){
        super(fats, carbs, proteins);
        this.title = title;
        this.grams = grams;
    }

    toJSON(){
        let baseMacroProperties = BaseMacros.prototype.toJSON.call(this);
        return { 
            ...baseMacroProperties,
            title: this.title,
            grams: this.grams
        }
    }
}