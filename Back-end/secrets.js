module.exports = {
  hashRounds: parseInt(process.env.HASH_ROUNDS) || 8,
  jwtSecret: process.env.JWT_SECRET || "not all that is gold glitters",
};
