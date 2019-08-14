import caloriesHandler from './handlers/calories-handlers';
import servingsHandlers from './handlers/servings-handlers';
import dailyEntriesHandlers from './handlers/daily-entries-handlers';
import previousEntriesHandlers from './handlers/previous-entries-handlers';
import graphHandlers from './handlers/graph-handlers';

export default () => {
    caloriesHandler();
    servingsHandlers();
    dailyEntriesHandlers();
    previousEntriesHandlers();
    graphHandlers();
    console.log("Handlers for macros section initialized");
}