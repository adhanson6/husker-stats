/**
 * Array of all tables in the order they would need to be dropped in due to foreign key constraints.
 */
const tableNames = require('./tableNames');

module.exports = [
  tableNames.game_stat,
  tableNames.team_stat,
  tableNames.game,
  tableNames.team,
  tableNames.season,
  tableNames.season_type,
  tableNames.stat_type,
  tableNames.conference,
  tableNames.division,
];
