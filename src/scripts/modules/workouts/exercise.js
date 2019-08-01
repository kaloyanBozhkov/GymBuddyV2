import {setRecords, checkForRecord} from '../app/workouts/crud-records-library';
export default class Exercise{
    constructor(id, name, comment, categoryId = 1){
        this.name = name;
        this.exerciseId = id;
        this.categoryID = categoryId;
        this.comment = comment; 
        this.record = []; //array of Records 
        this.checkForRecord = checkForRecord;
        this.setRecords = setRecords;
    }
}
