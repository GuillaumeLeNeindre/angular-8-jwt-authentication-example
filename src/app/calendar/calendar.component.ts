import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Distribution, User, Basket } from "../_models";
import { DistributionsService, AuthenticationService } from "../_services"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
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
    )
    { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.newDistributionForm = new FormGroup(
        {
          date: new FormControl('')
        });
    }

  ngOnInit() {
    this.getDistributions();
  }

  getDistributions() : void
  {
    this._distributionsService.getDistributions().subscribe(distributions => this._distributions = distributions);
    console.log("HTTP request is made");

  }

  get distributions() : Distribution[]
  {
    return this._distributions;
  }


  updateDistribution(updatedDistribution : Distribution) : void
  {
    if (updatedDistribution)
    {
      let toBeUpdatedDistribution : Distribution = this._distributions.find(x => x.id === updatedDistribution.id);
      if (toBeUpdatedDistribution)
      {
        Object.assign(toBeUpdatedDistribution, updatedDistribution);
      }
    }
  }

  setAbsence(distribution : Distribution) : void
  {
    if (distribution)
    {
      let newDistribution = Object.assign(new Distribution, distribution);
      newDistribution.setAbsence(this.currentUser.username);
      this._distributionsService.updateDistribution(newDistribution)
        .subscribe(
          (updatedDistribution : Distribution) => this.updateDistribution(Object.assign(new Distribution, updatedDistribution))
        );
    }
    else
    {
      console.log("date $date not found");
    }
  }

  setTaker(distribution : Distribution, proprietary : string) : void
  {
    if (distribution)
    {
      let newDistribution = Object.assign(new Distribution, distribution);
      newDistribution.setTaker(proprietary, this.currentUser.username);
      this._distributionsService.updateDistribution(newDistribution)
        .subscribe(
          (updatedDistribution : Distribution) => this.updateDistribution(Object.assign(new Distribution, updatedDistribution))
        );
    }
    else
    {
      console.log("date $date not found");
    }
  }

  distributionExists(newDate : Date) : boolean
  {
    if (this._distributions.find(x => x.date === newDate))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  dupplicateDistribution(dupplicateDistribution : Distribution) : void
  {
    const newDate = this.newDistributionForm.value.date;
    if (this.distributionExists(newDate))
    {
      console.log("erreur : la distribution existe déjà");
      return;
    }
    if (dupplicateDistribution)
    {
      let newDistribution = Object.assign(new Distribution, dupplicateDistribution);
      newDistribution.date = newDate;
      
      this._distributionsService.addDistribution(newDistribution).subscribe(returnedDistribution => {
        this.distributions.push(Object.assign(new Distribution, returnedDistribution));
      });
      this.showDistributionCreationForm = "";
    }
    else
    {
      console.log("dupplicateDistribution undefined");
    }
  }

  deleteDistribution(distribution : Distribution) : void
  {
    for (let index = 0; index < this._distributions.length; index++)
    {
      if (this._distributions[index].date == distribution.date)
      {
        this._distributions.splice(index,1);
      }
    }
    this._distributionsService.deleteDistribution(distribution).subscribe(x => this.getDistributions());
  }

  
}
