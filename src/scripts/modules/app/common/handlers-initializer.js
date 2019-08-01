import commonHandlers from './handlers/common-handlers';
import generalHandlers from './handlers/general-handlers';
import alertMsgHandlers from './handlers/alert-msg-handlers';

export default () => {
    commonHandlers();
    generalHandlers();
    alertMsgHandlers();
    console.log("Common handlers initialized");
}