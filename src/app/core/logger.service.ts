import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logging: boolean = environment.logging;

  constructor() { }

  logInformation(key: string, value: any)
  {
    this.logging ? console.log(key.concat('::::::'), value) : undefined;
  }

  logWarning(key: string, value: any)
  {
    this.logging ? console.warn(key.concat('::::::'), value) : undefined;
  }

  logError(key: string, value: any)
  {
    this.logging ? console.error(key.concat('::::::'), value) : undefined;
  }
}
