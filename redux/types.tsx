import { User } from '../libs/randomUser';

type RootState = {
    [id in string]: {
        data: User,
        favorite: boolean;
    };
}

export { RootState };
