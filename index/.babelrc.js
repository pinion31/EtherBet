const isTest = String(process.env.NODE_ENV) == 'test';
module.exports =
{
  //presets: ['@babel/preset-env','@babel/preset-react', { modules: isTest ? 'commonjs' : false }],
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
}