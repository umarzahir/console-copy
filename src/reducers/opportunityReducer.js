import { FETCH_OPPORTUNITIES } from "../actions/types.js";

const initialState = {
    opportunities: null,
    opportunityName: "",
    opportunityLevel: "",
    peopleRequired: "",
    date: new Date(),
    calendar: false
}
const opportunityReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OPPORTUNITIES:
            {
                return state;
            }
        case "MANAGE_OPPORTUNITY":

            return {
                opportunities: [...action.payload],
            }
<<<<<<< HEAD
        case "ADD_OPPORTUNITY":
            {
                console.log("inside opp reducer",action.payload)
            }
=======


        case "ADD_OPPORTUNITY":
            return state




>>>>>>> dev
        case "UPDATE_OPP": {
            return {
                opportunities: [...action.payload],
            }
        }
        default:
            return { ...state }
    }
}
export default opportunityReducer;