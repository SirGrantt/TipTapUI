export function transformTeamData(cardId, source, dest){
  let checkoutId = Number(cardId);
  let sourceId;
  let teamId;

  if (source === dest)
  {
    return;
  }
  else if (source === 'Individual')
  {
    sourceId = 'Individual';
    teamId = Number(dest);

    return { checkoutId, sourceId, teamId };
  }
  else if (dest === 'Individual')
  {
    sourceId = Number(source);
    teamId = 'Individual';

    return { checkoutId, sourceId, teamId };
  }
  else
  {
    sourceId = Number(source);
    teamId = Number(dest);
    return { checkoutId, sourceId, teamId };

  }
}

export function findTeamWithCheckout(checkoutId, teams){
  let team = teams.find((t) => {
    if(t.teamCheckouts.some(c => c.id === checkoutId)) {
      return true;
    }
  });

  if (team === undefined) {
    return null;
  }
  else {
    return team.teamId;
  }
}