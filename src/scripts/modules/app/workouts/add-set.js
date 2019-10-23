import alertMsg from '../common/alert-msg';
import global from '../../global-variables';
export default function(){
        let exercise = $(this).data('exercise');
        alertMsg("addSet", true, ['DETAILS'], [JSON.stringify(exercise)],undefined,true);
}