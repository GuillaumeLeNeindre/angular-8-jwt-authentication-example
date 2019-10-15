export class Basket {
    constructor(private _date:number, private _proprietary : string, private _taker?:string) {};

    get proprietary() : string
    {
        return this._proprietary;
    }

    set proprietary(proprietary : string)
    {
        this._proprietary = proprietary;
    }

    get date() : number
    {
        return this._date;
    }

    set date(date)
    {
        this._date = date;
    }

    get taker() : string
    {
        return this._taker;
    }

    set taker(taker)
    {
        this._taker = taker;
    }

}