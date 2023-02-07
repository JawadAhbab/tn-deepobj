export declare type Path = (string | number)[];
export declare type Userpath = number | string | Path;
export declare type Prop = string | number;
export declare type Corelp = (obj: any, prop: Prop, value: any) => any;
export declare type Coreop = (obj: any, prop: Prop, value: any, nextprop: Prop) => {
    return?: true;
    retval?: any;
};
