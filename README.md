# Notes

- `React` will keep the state around for as long as you render the **same component at the same position in the UI tree (not in the `JSX` markup)**. when `React` removes a component, it destroys its state.

- In both cases below, the `App` component returns a `<div>` with `<Counter />` as a first child. To React, these two counters have the same “address”: the first child of the first child of the root. This is how `React` matches them up between the previous and next renders, regardless of how you structure your logic.

![ui tree](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_same_component.dark.png&w=640&q=75)

- **Reducers are a different way to handle state. You can migrate from `useState` to `useReducer` in three steps:**

  1. **Move** from setting state to dispatching actions.
  2. **Write** a reducer function.
  3. **Use** the reducer from your component.

