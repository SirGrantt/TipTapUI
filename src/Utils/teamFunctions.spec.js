import { transformTeamData, findTeamWithCheckout } from './teamFunctions';


describe('the transformTeamData method', () => {
  it('takes string ids and returns an object with checkoutIdId, sourceIdId, and teamIdId ', () => {
    let result = transformTeamData('1', '2', '5');
    
    expect(result).toEqual({checkoutId: 1, sourceId: 2, teamId: 5});
  });

  it('takes individual as sourceId value and returns that', () => {
    let result = transformTeamData('3', 'Individual', '6');

    expect(result).toEqual({checkoutId: 3, sourceId: 'Individual', teamId: 6});
  });

  it('takes individual as destination value and returns that', () => {
    let result = transformTeamData('3', '7', 'Individual');

    expect(result).toEqual({checkoutId: 3, sourceId: 7, teamId: 'Individual'});
  });

  it('takes a sourceId and teamId id as the same and returns null', () => {
    let result = transformTeamData('2', '2', '2');

    expect(result).toEqual(undefined);
  });
});

describe('the findTeamWithCheckout', () => {
  it('takes a list of teams and a checkoutId and returns the team containing that checkout', () => {
    let checkoutId = 1;
    let checkout1 = {id: 1, staffMember: 'Grant', sales: 100};
    let checkout2 = {id: 2, staffMember: 'Alyson', sales: 200};
    let checkout3 = {id: 3, staffMember: 'Nathan', sales: 200};
    let checkout4 = {id: 4, staffMember: 'James', sales: 400};
    let team1 = {teamId: 2108, teamCheckouts: [checkout1, checkout4]};
    let team2 = {teamId: 9092, teamCheckouts: [checkout2, checkout3]};
    let teams = [team1, team2];

    let result = findTeamWithCheckout(checkoutId, teams);

    expect(result).toEqual(2108);
  });

  it('takes a list of teams and a checkoutId and returns the null with no team containing it', () => {
    let checkoutId = 12;
    let checkout1 = {id: 1, staffMember: 'Grant', sales: 100};
    let checkout2 = {id: 2, staffMember: 'Alyson', sales: 200};
    let checkout3 = {id: 3, staffMember: 'Nathan', sales: 200};
    let checkout4 = {id: 4, staffMember: 'James', sales: 400};
    let team1 = {teamId: 2108, teamCheckouts: [checkout1, checkout4]};
    let team2 = {teamId: 9092, teamCheckouts: [checkout2, checkout3]};
    let teams = [team1, team2];

    let result = findTeamWithCheckout(checkoutId, teams);

    expect(result).toEqual(null);
  });
});
