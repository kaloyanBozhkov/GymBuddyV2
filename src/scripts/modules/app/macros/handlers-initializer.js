import caloriesHandler from './handlers/calories-handlers';
import servingsHandlers from './handlers/servings-handlers';
import dailyEntriesHandlers from './handlers/daily-entries-handlers';
import historyEntriesHandlers from './handlers/history-entries-handlers';
import graphHandlers from './handlers/graph-handlers';

export default () => {
    caloriesHandler();
    servingsHandlers();
    dailyEntriesHandlers();
    historyEntriesHandlers();
    graphHandlers();
    console.log("Handlers for macros section initialized");
}