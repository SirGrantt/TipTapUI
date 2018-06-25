import * as type from '../reduxActions/actionTypes';
import initialState from './initialState';

function checkoutReducer(state = initialState.checkouts, action){
    switch(action.type) {
        case type.LOAD_CHECKOUTS_SUCCESS: {
        const checkouts = { individual: [], team: [] };
        checkouts.individual = action.individualCheckouts;
        checkouts.team = action.teamCheckouts;
        return checkouts;
        }
        
        case type.ADD_CHECKOUT_SUCCESS :
        return {
            individual: [
                ...state.individual,
                Object.assign({}, action.checkout)
            ],
            team: [
                ...state.team
            ]
        };

        case type.ADD_CHECKOUT_TO_TEAM_SUCCESS : {
        const { updatedCheckout, sourceId, teamId } = action.updatedCheckoutData;
        if (sourceId === 'Individual')
        {
            let newIndividual = state.individual.slice();
            newIndividual.filter(c => c.id !== updatedCheckout.id);

            let addTeam = state.team.find(t => t.id === teamId);
            let newAddTeam = Object.assign({}, addTeam);
            newAddTeam.teamCheckouts = addTeam.teamCheckouts.slice();
            newAddTeam.teamCheckouts.push(updatedCheckout);

            let teams = state.team.slice();
            teams.filter(t => t.id !== addTeam.id);

            return {
                Individual: [...newIndividual],
                team: [
                    ...teams,
                    newAddTeam
                ]
            };
        }
        else {
            let removeTeam = state.team.find(t => t.id === sourceId);
            let newRemoveTeam = Object.assign({}, removeTeam);
            newRemoveTeam.teamCheckouts = removeTeam.teamCheckouts.slice();
            newRemoveTeam.teamCheckouts.splice(newRemoveTeam.teamCheckouts
                .findIndex(t => t.id === updatedCheckout.id), 1);

            let addTeam = state.team.find(t => t.id === teamId);
            let newAddTeam = Object.assign({}, addTeam);
            newAddTeam.teamCheckouts = addTeam.teamCheckouts.slice();
            newAddTeam.teamCheckouts.push(updatedCheckout);

            let teams = state.team.slice();
            teams.filter(t => t.id !== newRemoveTeam.id);
            teams.filter(t => t.id !== newAddTeam.id);

            return {
                individual: state.individual,
                team: [
                    ...teams,
                    newRemoveTeam,
                    newAddTeam
                ]
            };
        }
    }

        case type.ADD_SERVER_TEAM_SUCCESS :
        return {
            individual: [ ...state.individual],
            team: [
            ...state.team,
            action.serverTeam
        ]
        }

        default:
        return state;
    }
}

export default checkoutReducer;