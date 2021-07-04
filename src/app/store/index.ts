import { createSelector } from '@ngrx/store';
import { User } from '../account/_models/user.model';
import { AppState } from './app.states';

export interface ProfileState{
    user: User;
//    refresh: string;
//    access: string;
//    username: string;
}

export const selectUser = (state: AppState) => state;


