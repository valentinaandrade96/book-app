// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlDatos: 'https://www.googleapis.com/books/v1/volumes?q=id=',
  //urlDatos: 'https://www.googleapis.com/books/v1/volumes?q=quilting',
  //urlServidor: 'https://bookserver-6e5c8a077822.herokuapp.com/',
  urlUsuario:'https://bookserver-6e5c8a077822.herokuapp.com/usuario/',
  urlArticulo:'https://bookserver-6e5c8a077822.herokuapp.com/articulo/',
  urlDescuentos:'https://bookserver-6e5c8a077822.herokuapp.com/descuentos/',
  urlCompras:'https://bookserver-6e5c8a077822.herokuapp.com/compras/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
