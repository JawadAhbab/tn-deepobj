import { AnyObject } from 'tn-typescript';
import { Userpath } from '../../accessories/Types';
export declare const methodSet: <T>(object: AnyObject, userpath: Userpath, newval: T | ((oldval: any) => T)) => T;
