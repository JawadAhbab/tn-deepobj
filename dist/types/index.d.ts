export declare const deepobj: {
    set: <T>(object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, newval: T | ((oldval: any) => T)) => T;
    setnew: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, newval: any) => any;
    update: <T_1>(object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, newval: T_1 | ((oldval: any) => T_1)) => T_1 | undefined;
    get: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath) => any;
    push: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, ...items: any[]) => any[];
    unshift: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, ...items: any[]) => any[];
    pop: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, howmany?: number) => any[];
    shift: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, howmany?: number) => any[];
    assign: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, assigner: import("tn-typescript").AnyObject, deep?: boolean) => import("tn-typescript").AnyObject;
    remove: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath, ...props: (string | string[])[]) => import("tn-typescript").AnyObject;
    has: (object: import("tn-typescript").AnyObject, ...userpaths: import("./accessories/Types").Userpath[]) => boolean;
    empty: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath) => {} | "" | [] | null;
    delete: (object: import("tn-typescript").AnyObject, userpath: import("./accessories/Types").Userpath) => any;
};
