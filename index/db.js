const Sequelize = require('sequelize');

const { Op } = Sequelize;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const {
  username, password, dbName, dbUrl,
} = process.env.NODE_ENV === 'production' ? {
  username: process.env.ETHERBET_DB_USERNAME,
  password: process.env.ETHERBET_DB_PW,
  dbName: process.env.ETHERBET_DB_NAME,
  dbUrl: process.env.ETHERBET_DB_URL,
} : {
  username: 'postgres',
  password: 'postgres',
  dbName: 'etherbet',
  dbUrl: 'localhost',
};


const sequelize = new Sequelize(dbName, username, password, {
  host: dbUrl,
  dialect: 'postgres',
  // logging: false,
  operatorsAliases,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
