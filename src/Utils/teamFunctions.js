export function transformTeamData(cardId, sourceId, destId){
  let card = Number(cardId);
  let source;
  let dest;
  if (sourceId === destId)
  {
    return;
  }
  else if (sourceId === 'Individual')
  {
    source = 'Individual';
    dest = Number(destId);

    return { card, source, dest };
  }
  else if (destId === 'Individual')
  {
    source = Number(sourceId);
    dest = 'Individual';

    return { card, source, dest };
  }
  else
  {
    source = Number(sourceId);
    dest = Number(destId);
    return { card, source, dest };

  }
}