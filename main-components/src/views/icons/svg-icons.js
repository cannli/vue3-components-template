const req = require.context("../../icons/svg", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys();

const re = /\.\/(.*)\.svg/;

const svgIcons = requireAll(req).map((i) => {
  return i.match(re)[1];
});
console.log(svgIcons, "svgIcons");
export default svgIcons;
