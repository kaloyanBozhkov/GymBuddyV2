import caloriesHandler from './handlers/calories-handlers';
import servingsHandlers from './handlers/servings-handlers';
import entriesHandlers from './handlers/entries-handler';
import historyEntriesHandlers from './handlers/history-entries-handlers';
import graphHandlers from './handlers/graph-handlers';

export default () => {
    caloriesHandler();
    servingsHandlers();
    entriesHandlers();
    historyEntriesHandlers();
    graphHandlers();
    console.log("Handlers for macros section initialized");
}