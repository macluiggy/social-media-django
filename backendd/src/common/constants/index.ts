import USER from './user';

const API_VERSION = 'v1';
const OBJECT = {
  a: 1,
};
const NODE_ENVIRONMENTS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
};

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

function sealAndFreezeObj(...objs) {
  // return Object.freeze(Object.seal(Object.assign({}, ...objs)));
  for (const obj of objs) {
    Object.seal(obj);
    Object.freeze(obj);
  }
}

sealAndFreezeObj(OBJECT, API_VERSION, NODE_ENVIRONMENTS, USER);

export { API_VERSION, OBJECT, NODE_ENVIRONMENTS, ONE_WEEK_IN_SECONDS, USER };
