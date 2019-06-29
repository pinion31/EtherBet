const isTest = String(process.env.NODE_ENV) == 'test';
//console.log('isTest', isTest);
module.exports =
{
  //presets: ['@babel/preset-env','@babel/preset-react', { modules: isTest ? 'commonjs' : false }],
  presets: ['@babel/preset-env','@babel/preset-react'],
  plugins: ['transform-class-properties','@babel/plugin-transform-runtime']
}
