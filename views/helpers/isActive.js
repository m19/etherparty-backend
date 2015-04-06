module.exports = function (context) {
  return context.hash.path === context.data.root.path ? 'active' : '';
};