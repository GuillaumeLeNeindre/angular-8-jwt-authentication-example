import { Injectable } from '@angular/core';
import { Distribution } from "../_models";
import { DISTRIBUTIONS } from "../mock/distributions-mock";

@Injectable({
  providedIn: 'root'
})
export class DistributionsService {
  private _distributions : Distribution[] = DISTRIBUTIONS;
  constructor() { };

  get distributions() : Distribution[] {
    return this._distributions;
  }

  set distributions(distributions : Distribution[])
  {
    this._distributions = distributions;
  }
}
