export type Path = (string | number)[];
export type Userpath = number | string | Path;
export type Prop = string | number;
export type Corelp = (obj: any, prop: Prop, value: any) => any;
export type Coreop = (obj: any, prop: Prop, value: any, nextprop: Prop) => {
    return?: true;
    retval?: any;
};
