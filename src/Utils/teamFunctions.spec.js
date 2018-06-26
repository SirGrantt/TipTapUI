import { transformTeamData } from './teamFunctions';


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
