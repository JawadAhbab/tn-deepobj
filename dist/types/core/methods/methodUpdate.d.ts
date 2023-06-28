import { AnyObject } from 'tn-typescript';
import { Userpath } from '../../accessories/Types';
export declare const methodUpdate: <T>(object: AnyObject, userpath: Userpath, newval: T | ((oldval: any) => T)) => T | undefined;
