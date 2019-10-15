import { Component, OnInit } from '@angular/core';
import { Distribution, User, Basket } from "../_models";
import { DistributionsService, AuthenticationService } from "../_services"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  private _distributions : Distribution[];
  private title : string = "Calendrier des distributions";
  private currentUser: User;

  constructor(
    private _distributionsService : DistributionsService,
    private authenticationService: AuthenticationService
    ) { 
    this._distributions = this._distributionsService.distributions;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  ngOnInit() {
  }

  get distributions() : Distribution[]
  {
    return this._distributions;
  }

  setAbsence(date : number) : void
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

  setTaker(date:number, proprietary:string) : void
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

  dupplicateDistribution(date : number) : void
  {
    const distribution : Distribution = this._distributions.find(x => x.date === date);
    if (distribution)
    {
      let newDistribution = new Distribution(distribution.date, []);
      for (let basket of distribution.baskets)
      {
        let newBasket = new Basket(basket.date, basket.proprietary, basket.taker);
        newDistribution.baskets.push(newBasket);
      }
      this._distributions.push(newDistribution);
      this._distributionsService.distributions = this._distributions;
    }
    else
    {
      console.log("date $date not found");
    }
  }

  deleteDistribution(date : number) : void
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
