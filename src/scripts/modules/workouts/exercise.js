import {setRecords, checkForRecord} from '../app/workouts/crud-records-library';
export default class Exercise{
    constructor(id, title, description, categoryKey){
        this.title = title;
        this.exerciseId = id;
        this.categoryKey = categoryKey;
        this.description = description; 
        this.record = []; //array of Records 
        this.checkForRecord = checkForRecord;
        this.setRecords = setRecords;
    }
}
