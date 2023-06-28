import { AnyObject } from 'tn-typescript';
import { Corelp, Coreop, Userpath } from '../accessories/Types';
interface CoreProps {
    object: AnyObject;
    userpath: Userpath;
    lastpath: Corelp;
    otherpath: Coreop;
}
export declare const core: ({ object, userpath, lastpath, otherpath }: CoreProps) => any;
export {};
