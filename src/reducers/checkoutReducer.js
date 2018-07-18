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

        case type.UPDATE_CHECKOUT_SUCCESS :
        {
            let checkoutToUpdate;
            let individualCheckoutsCopy = state.individual.slice();
            checkoutToUpdate = individualCheckoutsCopy.find(c => c.id === action.updatedCheckout.id);

            if (checkoutToUpdate !== undefined)
            {
                let filteredIndividual = individualCheckoutsCopy.filter(c => c.id !== checkoutToUpdate.id);
                return {
                    individual: [ ...filteredIndividual, action.updatedCheckout ],
                    team: [...state.team ]
                };
            }
            else {
                let teamCheckoutsCopy = state.team.slice();
                let index;
                let teamWithCheckout;
                teamCheckoutsCopy.forEach(t => {
                    if (t.teamCheckouts.some(s => s.id === action.updatedCheckout.id))
                    {
                        index = t.teamCheckouts.findIndex(c => c.id === action.updatedCheckout.id);
                        teamWithCheckout = Object.assign({}, t);
                    }
                });
                teamWithCheckout.teamCheckouts = teamWithCheckout.teamCheckouts.slice();
                let filteredTeamCheckouts = teamWithCheckout.teamCheckouts.filter(c => c.id !== action.updatedCheckout.id);
                teamWithCheckout.teamCheckouts = filteredTeamCheckouts;
                teamWithCheckout.teamCheckouts.splice(index, 0, action.updatedCheckout);
                let filteredState = teamCheckoutsCopy.filter(t => t.id === teamWithCheckout.id);

                return {
                    individual: [ ...state.individual ],
                    team: [ ...filteredState,
                    teamWithCheckout ]
                };

            }
        }

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

        case type.ADD_EARNING_TO_TEAM : {
            const { teamId, teamEarning } = action;
            let stateCopy = Object.assign({}, state);
            stateCopy.team = state.team.slice();

            let teamToUpdate = state.team.find(t => t.teamId === teamId);
            let indexOfTeam = state.team.findIndex(t => t.teamId === teamId);
            let teamCopy = Object.assign({}, teamToUpdate);
            teamCopy.teamEarning = teamEarning;
            teamCopy.checkoutHasBeenRun = true;
            let filteredTeams = stateCopy.team.filter(t => t.teamId !== teamId);
            stateCopy.team = filteredTeams;
            stateCopy.team.splice(indexOfTeam, 0, teamCopy);

            return {
                individual: [...state.individual],
                team: [
                    ...stateCopy.team
                ]
            };
        }

        case type.REMOVE_SERVER_TEAM_EARNING : {
            const { teamId } = action;
            let stateCopy = state.team.slice();
            let teamCopy = Object.assign({}, stateCopy.find(t => t.teamId == teamId));
            teamCopy.teamEarning = null;
            let index = stateCopy.findIndex(t => t.teamId === teamId);
            stateCopy.splice(index, 1, teamCopy);

            return {
                individual: [...state.individual],
                team: [...stateCopy]
            };
        }

        case type.DELETE_CHECKOUT_SUCCESS : {
            const { checkoutId, teamId } = action;
            let stateIndiCopy = state.individual.slice();
            let stateTeamCopy = state.team.slice();
            if (teamId === null)
            {
                let filteredStateIndiCopy = stateIndiCopy.filter(c => c.id !== checkoutId);

                return {
                    individual: [...filteredStateIndiCopy],
                    team: [...stateTeamCopy]
                };
            }
            else {
                let team = {...stateTeamCopy.find(t => t.teamId === teamId)};
                team.teamCheckouts = stateTeamCopy.find(t => t.teamId === teamId).teamCheckouts.slice();
                let index = team.teamCheckouts.findIndex(c => c.id === checkoutId);
                team.teamCheckouts.splice(index, 1);

                let indexOfTeam = stateTeamCopy.findIndex(t => t.teamId === teamId);
                stateTeamCopy.splice(indexOfTeam, 1, team);

                return {
                    individual: [...stateIndiCopy],
                    team: [...stateTeamCopy]
                };
            }
        }

        default:
        return state;
    }
}

export default checkoutReducer;