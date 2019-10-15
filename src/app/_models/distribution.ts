import { Basket } from './basket';

export class Distribution {

    constructor(private _date:Date, private _baskets: Basket[]) {};

    get baskets() : Basket[]
    {
        return this._baskets;
    }

    newBasket(newBasket : Basket) : number
    {
        return (this._baskets.push(newBasket));
    }

    get date() : Date
    {
        return this._date;
    }

    set date(date : Date)
    {
        this._date = date;
    }

    setAbsence(taker : string) : void
    {
        if (taker)
        {
            for (const basket of this._baskets)
            {
                if (basket.taker === taker)
                {
                    basket.taker = undefined;
                }
            }
        }
    }

    setTaker(proprietary : string, taker : string) : void
    {
        if (proprietary)
        {
            const basket : Basket = this._baskets.find(x => x.proprietary === proprietary);
            if (basket)
            {
            basket.taker = taker;
            }
            else
            {
            console.log('setAbsence : username $proprietary not found')
            }
        }
    }
}