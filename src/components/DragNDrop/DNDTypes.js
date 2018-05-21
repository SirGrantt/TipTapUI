// @flow

export type Id = string;

export type Job = {|
    id: Id,
    title: string,
    apiId: number
|}

export type Checkout = {|
    staffMemberName: string,
    id: Id,
    apiId: number,
    nonTipOutBarSales: number,
    numberOfBottlesSold: number,
    lunchOrDinner: string,
    sales: number,
    grossSales: number,
    barSales: number,
    ccTips: number,
    cashTips: number,
    ccAutoGrat: number,
    cashAutoGrat: number,
    hours: number,
    staffMemberId: number,
    jobWorkedTitle: string,
    stringDate: string,
    
|}

export type CheckoutMap = {|
    [key: string]: Checkout[]
    |}

export type CardTitle = {|
    title: string
|}

export type JobMap = {|
    [key: string]: Job[]    
|}