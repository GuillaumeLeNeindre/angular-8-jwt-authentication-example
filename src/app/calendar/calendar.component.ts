import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Distribution, User, Basket } from "../_models";
import { DistributionsService, AuthenticationService } from "../_services"
// import { truncate } from 'fs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  private _distributions : Distribution[];
  private title : string = "Calendrier des distributions";
  private currentUser: User;
  private showDistributionCreationForm : string = "";
  private newDistributionForm : FormGroup;

  constructor(
    private _distributionsService : DistributionsService,
    private authenticationService: AuthenticationService
    ) { 
    this._distributions = this._distributionsService.distributions;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.newDistributionForm = new FormGroup({
      date: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  get distributions() : Distribution[]
  {
    return this._distributions;
  }

  setAbsence(date : Date) : void
  {
    const distribution : Distribution = this._distributions.find(x => x.date === date);
    if (distribution)
    {
      distribution.setAbsence(this.currentUser.username);
      this._distributionsService.distributions = this._distributions;
    }
    else
    {
      console.log("date $date not found");
    }
  }

  setTaker(date:Date, proprietary:string) : void
  {
    const distribution : Distribution = this._distributions.find(x => x.date === date);
    if (distribution)
    {
      distribution.setTaker(proprietary, this.currentUser.username);
      this._distributionsService.distributions = this._distributions;
    }
    else
    {
      console.log("date $date not found");
    }
  }

  distributionExists() : boolean
  {
    if (this._distributions.find(x => x.date === this.newDistributionForm.value.date))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  dupplicateDistribution(date : Date) : void
  {
    if (this.distributionExists())
    {
      console.log("erreur : la distribution existe déjà");
      return;
    }
    const distribution : Distribution = this._distributions.find(x => x.date === date);
    if (distribution)
    {
      let newDistribution = new Distribution(this.newDistributionForm.value.date, []);
      for (let basket of distribution.baskets)
      {
        let newBasket = new Basket(basket.proprietary, basket.taker);
        newDistribution.baskets.push(newBasket);
      }
      this._distributions.push(newDistribution);
      this._distributionsService.distributions = this._distributions;
      this.showDistributionCreationForm = "";
    }
    else
    {
      console.log("date $date not found");
    }
  }

  deleteDistribution(date : Date) : void
  {
    for (let index = 0; index < this._distributions.length; index++)
    {
      if (this._distributions[index].date == date)
      {
        this._distributions.splice(index,1);
      }
    }
    this._distributionsService.distributions = this._distributions;
  }

  
}
