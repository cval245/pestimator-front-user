// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL: 'http://localhost:8000/',
    STRIPE_PUBLISHABLE_KEY:'pk_test_51H7SvaEsr85VxCzR5tPcI81RRPeOMiXVp3k8VdXEylOEpwT1bXkE5JO5IVhXkmk25Oa6mmOnBgh6MynkdliZ5ENl00YaLBl1Jj',
    RECAPTCHA_SITE_KEY: '6Lf7PakcAAAAAAaGwssS4YOGraagGj7VJgOAS7Pp',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
