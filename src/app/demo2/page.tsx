"use client";

// state type
interface CounterState {
 count:number;
}

// action types
type CounterAction =
| {type:'increment';payload:number}
| {type:'decrement';payload:number}
| {type:'reset'}


// reducer function

function counterReducer(state:CounterState,action:CounterAction):CounterState{
 switch (action.type){
  case 'increment':
   return {count:state.count+action.payload}
  case 'decrement':
    return {count:state.count-action.payload}
  case 'reset':
   return {count:0}
  default:
    const exhaustiveCheck:never=action;
    throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
 }
}

export default function Demo2Page() {
  return <h1 className="text-lg">Demo2Page</h1>;
}
