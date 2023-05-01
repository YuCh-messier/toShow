/** @type {import('tailwindcss').Config} */
var {CssSetting}=require('./project.config.cjs')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize:CssSetting.fontSize,
      colors:CssSetting.formalColors,
      spacing:CssSetting.spacing,
      width:CssSetting.width,
    },
  },
  plugins: [],
}
