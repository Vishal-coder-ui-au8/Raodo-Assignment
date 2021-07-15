import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

//You can't use fetch in actions without middleware. Actions must be plain objects. You can use a middleware like redux-thunk 
//to do fetch and then dispatch another action.
export default applyMiddleware(thunk)