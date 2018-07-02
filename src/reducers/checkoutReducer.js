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
        const { checkoutId, sourceId, teamId } = action.updatedCheckoutData;
        if (sourceId === 'Individual')
        {
            let checkout = Object.assign({}, state.individual.find(c => c.id ===checkoutId));
            let newIndividual = state.individual.slice();
            let filteredIndividual = newIndividual.filter(c => c.id !== checkoutId);

            let addTeam = state.team.find(t => t.teamId === teamId);
            let addTeamCopy = Object.assign({}, addTeam);
            addTeamCopy.teamCheckouts = addTeam.teamCheckouts.slice();
            let stateTeamsCopy = state.team.slice();
            let teamsIndex = stateTeamsCopy.findIndex(t => t.teamId == teamId);
            let filteredState = stateTeamsCopy.filter(t => t.teamId !== teamId);
            addTeamCopy.teamCheckouts.push(checkout);
            filteredState.splice(teamsIndex, 0, addTeamCopy);

            return {
                individual: [...filteredIndividual],
                team: [
                    ...filteredState
                ]
            };
        }
        else {
            let removeTeamCopy = Object.assign({}, state.team.find(t => t.teamId === sourceId));
            let checkout = Object.assign({}, removeTeamCopy.teamCheckouts.find(c => c.id === checkoutId));
            removeTeamCopy.teamCheckouts = removeTeamCopy.teamCheckouts.slice();
            removeTeamCopy.teamCheckouts.splice(removeTeamCopy.teamCheckouts
                .findIndex(t => t.id === checkoutId), 1);

            let addTeamCopy = Object.assign({}, state.team.find(t => t.teamId === teamId));
            addTeamCopy.teamCheckouts = addTeamCopy.teamCheckouts.slice();
            addTeamCopy.teamCheckouts.push(checkout);

            let teams = state.team.slice();
            let indexOfRemove = teams.findIndex(t => t.teamId === sourceId);
            let indexOfAdd = teams.findIndex( t => t.teamId === teamId);
            let filteredTeams = teams.filter(t => t.teamId !== sourceId);
            let finalTeams = filteredTeams.filter(t => t.teamId !== teamId);

            // The reordering of the checkoutmap will causing jumping depending on which
            // direction the card was added and removed from unless this check occurs
            if (indexOfAdd > indexOfRemove)
            {
            finalTeams.splice(indexOfRemove, 0, removeTeamCopy);
            finalTeams.splice(indexOfAdd, 0, addTeamCopy);
            }
            else {
                finalTeams.splice(indexOfAdd, 0, addTeamCopy);
                finalTeams.splice(indexOfRemove, 0, removeTeamCopy);
            }

            return {
                individual: [ ...state.individual ],
                team: [
                    ...finalTeams
                ]
            };
        }
    }

        case type.REMOVE_CHECKOUT_FROM_TEAM_SUCCESS: {
            const { checkoutId, sourceId } = action.removeFromTeamData;

            let removeTeamCopy = Object.assign({}, state.team.find(t => t.teamId === sourceId));
            let checkout = Object.assign({}, removeTeamCopy.teamCheckouts.find(c => c.id === checkoutId));
            removeTeamCopy.teamCheckouts = removeTeamCopy.teamCheckouts.slice();
            removeTeamCopy.teamCheckouts.splice(removeTeamCopy.teamCheckouts
                .findIndex(t => t.id === checkoutId), 1);
 
            let teamsCopy = state.team.slice();
            let teamIndex = teamsCopy.findIndex(t => t.teamId === sourceId);
            teamsCopy = teamsCopy.filter(t => t.teamId !== sourceId);
            teamsCopy.splice(teamIndex, 0, removeTeamCopy);
            
            let individualCopy = state.individual.slice();
            individualCopy.push(checkout);

            return {
                individual: [...individualCopy],
                team: [
                    ...teamsCopy
                ]
            };
            
            
        
            
        }

        case type.ADD_SERVER_TEAM_SUCCESS :
        return {
            individual: [ ...state.individual],
            team: [
            ...state.team,
            action.serverTeam
        ]
        };

        default:
        return state;
    }
}

export default checkoutReducer;