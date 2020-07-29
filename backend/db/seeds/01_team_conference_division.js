/* eslint-disable no-console */
/* eslint-disable-next-line no-unused-vars */
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

/**
 * This will initially seed the Team, Conference, and Division tables.
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Clear Team
  console.log('Clearing Team');
  await knex(tableNames.season).del();

  // Clear Conference
  console.log('Clearing Conference');
  await knex(tableNames.conference).del();

  // Clear Divison
  console.log('Clearing Divison');
  await knex(tableNames.division).del();

  // Insert a division. In this case, going with the West division in the B1G
  const division = {
    name: 'West',
  };

  const [createdDivision] = await knex(tableNames.division).insert(division).returning('*');
  const divisionId = createdDivision.id;
  console.log('Division Created:', createdDivision);

  // Insert a conference. The B1G conference
  const conference = {
    name: 'Big Ten',
  };

  const [createdConference] = await knex(tableNames.conference).insert(conference).returning('*');
  const conferenceId = createdConference.id;
  console.log('Conference Created:', createdConference);

  // Insert the Nebraska team into the team table with references to the division and conference inserted earlier.
  const team = {
    name: 'Nebraska Cornhuskers',
    division_id: divisionId,
    conference_id: conferenceId,
    color: '#E41C38',
    alt_color: '#FDF2D9',
    abbreviation: 'NU',
    logo: 'http://a.espncdn.com/i/teamlogos/ncaa/500-dark/158.png',
  };

  const [createdTeam] = await knex(tableNames.team).insert(team).returning('*');
  console.log('Conference Created:', createdTeam);
};
