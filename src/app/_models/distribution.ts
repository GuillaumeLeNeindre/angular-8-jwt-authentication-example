import { Basket } from './basket';


export class Distribution {
    public id : string;
    public baskets : Basket[];
     public date : Date;
    constructor () {};

    addBasket(newBasket : Basket) : number
    {
        return (this.baskets.push(newBasket));
    }
    
    setAbsence(taker : string) : void
    {
        if (taker)
        {
            for (const basket of this.baskets)
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
            const basket : Basket = this.baskets.find(x => x.proprietary === proprietary);
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