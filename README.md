# RemindMe! Frontend
Frontend for RemindMe! built with Angular 5 & Angular Material, served through a nginx Docker container.

[![Build Status](https://travis-ci.org/andryfailli/remindme-frontend.svg?branch=master)](https://travis-ci.org/andryfailli/remindme-frontend)
[![Coverage Status](https://coveralls.io/repos/github/andryfailli/remindme-frontend/badge.svg?branch=master)](https://coveralls.io/github/andryfailli/remindme-frontend?branch=master)
[![Quality Gate](https://sonarcloud.io/api/badges/gate?key=it.andreafailli.remindme%3Aremindme-frontend)](https://sonarcloud.io/dashboard?id=it.andreafailli.remindme%3Aremindme-frontend)
[![SonarCloud Bugs](https://sonarcloud.io/api/badges/measure?key=it.andreafailli.remindme%3Aremindme-frontend&metric=bugs)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?it.andreafailli.remindme%3Aremindme-frontend)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/badges/measure?key=it.andreafailli.remindme%3Aremindme-frontend&metric=vulnerabilities)](https://sonarcloud.io/component_measures/metric/security_rating/list?id=it.andreafailli.remindme%3Aremindme-frontend)
[![SonarCloud Technical Debt](https://sonarcloud.io/api/badges/measure?key=it.andreafailli.remindme%3Aremindme-frontend&metric=sqale_index)](https://sonarcloud.io/component_measures/metric/sqale_index/list?id=it.andreafailli.remindme%3Aremindme-frontend)

## Angular project
### Prerequisites
Make sure you have angular-cli installed (`npm install -g @angular/cli`) and then run `npm install` into the project folder.

### Run
Run `ng serve`.

### Test
Run `ng test --code-coverage`.

For mutation testing `npm run stryker`.

### Build
Run `ng build` to build the fontend into the `dist` folder.



## Docker image
If you want to build the final Docker image, you can do a maven build running `mvn clean package` (you need to have Docker installed and running).
