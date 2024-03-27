import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "strawberries", quantity: 9 },
  ],
  user: { loggedIn: true },
};
console.log(state);
// old method
const stateClone = Object.assign({}, state);
// lodash method
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

// Only parcel understands it - serves to keep the state maintained in the app without refreshing
if (module.hot) {
  module.hot.accept();
}
