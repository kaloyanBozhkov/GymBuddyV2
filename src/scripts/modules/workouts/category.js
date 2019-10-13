export default class Category{
    constructor(title, description, exercises = []){
        this.title = title;
        this.description = description;
        this.exercises = exercises;
    }
}