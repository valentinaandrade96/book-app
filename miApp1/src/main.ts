import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Application } from 'express';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import mongoose, { ConnectOptions } from "mongoose";
import * as express from 'express';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));