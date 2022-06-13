interface UserCredentials {
  name: string;
  surname: string;
  email: string;
  birth_date: string;
  gender: string;
  password: string;
}

/**
 * In get requests username is treated as number field so I thought I have to create 2 interfaces: 1 for post requests
 * and the other for get requests
 */
export interface UserPostCredentials extends UserCredentials {
  username: string;
}

export interface UserGetCredentials extends UserCredentials {
  number: number;
}
