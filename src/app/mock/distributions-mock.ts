import { Distribution, Basket } from "../_models";

export const DISTRIBUTIONS : Distribution[] = [
    new Distribution(1, [new Basket(1, "guillaume", "laure"), new Basket(1, "stéphane", "stéphane")]),
    new Distribution(2, [new Basket(2, "guillaume", "laure"), new Basket(2, "test", "test")]),
    new Distribution(3, [new Basket(3, "guillaume"), new Basket(3, "test", "test")])
]