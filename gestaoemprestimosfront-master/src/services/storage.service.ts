import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/local_user';
import { STORAGE_KEYS } from 'src/config/storage_keys.config';

@Injectable()
export class StorageService {

    getLocalStorage(): LocalUser {
        const usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalStorage(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}
