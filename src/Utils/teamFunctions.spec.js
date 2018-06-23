import { transformTeamData } from './teamFunctions';


describe('the transformTeamData method', () => {
  it('takes string ids and returns an object with cardId, sourceId, and destId ', () => {
    let result = transformTeamData('1', '2', '5');
    
    expect(result).toEqual({card: 1, source: 2, dest: 5});
  });

  it('takes individual as source value and returns that', () => {
    let result = transformTeamData('3', 'Individual', '6');

    expect(result).toEqual({card: 3, source: 'Individual', dest: 6});
  });

  it('takes individual as destination value and returns that', () => {
    let result = transformTeamData('3', '7', 'Individual');

    expect(result).toEqual({card: 3, source: 7, dest: 'Individual'});
  });

  it('takes a source and dest id as the same and returns null', () => {
    let result = transformTeamData('2', '2', '2');

    expect(result).toEqual(undefined);
  });
});
