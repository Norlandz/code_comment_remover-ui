declare module '*.css';
declare module '*.scss';
// []
// TypeScript does not know that there are files other than `.ts`or `.tsx` so it will throw an error if an import has an unknown file suffix.
// <>
// https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module
// ~~~// dk guess vite knew that 
