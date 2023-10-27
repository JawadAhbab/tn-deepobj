import { Prop, Userpath } from './Types';
export declare const devconsole: {
    mods: {
        setters: {
            when(type: 'update' | 'setnew', prop: Prop, userpath: Userpath): void;
        };
        array(userpath: Userpath, method: string): void;
        objs(userpath: Userpath, method: string): void;
    };
};
