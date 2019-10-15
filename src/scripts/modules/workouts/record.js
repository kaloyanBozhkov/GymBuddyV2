export default class Record{
    constructor(weight, reps, date, exerciseId, setId){
        this.reps = reps;
        this.weight = weight;
        this.where = {
            exerciseId,
            setId,
            date
        };
    }
}