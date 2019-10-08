import caloriesHandlers from './handlers/calories-handlers';
import servingsHandlers from './handlers/servings-handlers';
import dailyEntriesHandlers from './handlers/daily-entries-handlers';
import pastEntriesHandlers from './handlers/past-entries-handlers';
import graphHandlers from './handlers/graph-handlers';

export default () => {
    caloriesHandlers();
    servingsHandlers();
    dailyEntriesHandlers();
    pastEntriesHandlers();
    graphHandlers();
    console.log("Handlers for macros section initialized");
}