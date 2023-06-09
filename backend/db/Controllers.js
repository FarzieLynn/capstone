const knex = require("./dbConnection");

const getAvgScores = async (userID) => {
  const scores = await knex
    .avg("score")
    .from("test_scores")
    .where("user_id", "=", userID);
  return scores;
}

const addScore = async (userID, score) => {
  const newScore = await knex("test_scores").insert({
    user_id: userID,
    score: score,
  });
  return newScore;
};

const getScores = async (userID) => {
  const scores = await knex.select('*').from('test_scores').where('user_id', '=', userID);

  return scores;
}

module.exports = { getAvgScores, addScore, getScores };