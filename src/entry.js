//font icons and styles
import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {faAngleLeft, faAngleRight, faAngleUp, faHeart, faTrashAlt, faExclamationTriangle, faBook, faArrowLeft, faCheck, faTimes, faCommentDots, faTrophy} from '@fortawesome/free-solid-svg-icons';
library.add(
    faAngleLeft, 
    faAngleRight, 
    faAngleUp, 
    faHeart,
    faTrashAlt,
    faExclamationTriangle,
    faBook,
    faArrowLeft,
    faCheck,
    faTimes,
    faCommentDots,
    faTrophy);
dom.watch();
import './scss/entry.scss';
//device-related events
import './scripts/device-main-events';
//main app code
import './scripts/app';