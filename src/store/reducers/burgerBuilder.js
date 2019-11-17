import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredients = updateObject(state.ingredients, {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            });
            return updateObject(state, {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            });
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = updateObject(state.ingredients, {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            });
            const updatedSt = {
                ingredients: updatedIng,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 5,
                error: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            });
        default:
            return state;
    }
};

export default reducer;