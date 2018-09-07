import {
  State,
  Selector,
  StateContext,
  Action,
  createSelector
} from "@ngxs/store";

import { tap } from "rxjs/operators";
import { of, from } from "rxjs";
import API from "./firestore-services";

export class AuthStateModel {
  token?: string;
  user?: any;
  authChecked: boolean = false;
  error?: any;
  dataArray?: any;
}

export class FetchFirebaseArray {
  static readonly type = "[DATA] FetchFirebaseArray";
  public payload: { collection: string };
  constructor(collection: string) {
    this.payload = { collection };
  }
}

export class FetchFirebaseObject {
  static readonly type = "[DATA] FetchFirebaseObject";
  public payload: { collection: string; id: string };
  constructor(collection: string, id: string) {
    this.payload = { collection, id };
  }
}
export class Login {
  static readonly type = "[Auth] Login";
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthActionFail {
  static readonly type = "[Auth] ActionFailed";
  constructor(public payload: { action: string; error: any }) {}
}

export class CreateAccount {
  static readonly type = "[Auth] CreateAccount";
  constructor(public payload: { email: string; password: string }) {}
}

export class Logout {
  static readonly type = "[Auth] Logout";
}

export class CheckAuth {
  static readonly type = "[Auth] CheckAuth";
}

@State<AuthStateModel>({
  name: "auth"
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static getObjectById(state: AuthStateModel) {
    return (id: string) => {
      console.log('getObjectById', id, state);
      return state.dataArray.find(d => d.id == id);
    };
  }

  constructor() {}

  @Action(CheckAuth)
  async checkAuth({ patchState }: StateContext<AuthStateModel>) {
    const result = await API.checkAuth();
    patchState({ user: result, authChecked: true });
  }

  @Action(FetchFirebaseArray)
  async fetchFirebaseArray(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    { payload: { collection } }: FetchFirebaseArray
  ) {
    const result: any = await API.fetchObjects(collection);

    if (result && result.error) {
      dispatch(
        new AuthActionFail({
          action: FetchFirebaseArray.type,
          error: result.error
        })
      );
    } else {
      let r = [];

      result.docs.forEach(i => {
        r.push({
          id: i.id,
          ...i.data()
        });
      });
      patchState({ dataArray: r });
    }
  }

  @Action(FetchFirebaseObject)
  async fetchFirebaseObject(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    { payload: { collection, id } }: FetchFirebaseObject
  ) {
    const result: any = await API.fetchObject(collection, id);

    debugger;
    if (result && result.error) {
      dispatch(
        new AuthActionFail({
          action: FetchFirebaseObject.type,
          error: result.error
        })
      );
    } else {
      let r = [];

      result.docs.forEach(i => {
        r.push({
          id: i.id,
          ...i.data()
        });
      });
      patchState({ dataArray: r });
    }
  }

  @Action(CreateAccount)
  async createAccount(
    { patchState }: StateContext<AuthStateModel>,
    { payload: { email, password } }: CreateAccount
  ) {
    const result: any = await API.createUser({ email, password });
    if (result && result.error) {
      patchState({ error: result.error });
    } else {
      patchState({ user: result });
    }
  }

  @Action(Login)
  async login(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    { payload: { email, password } }: Login
  ) {
    const result: any = await API.auth({ email, password });

    if (result && result.error) {
      dispatch(new AuthActionFail({ action: Login.type, error: result.error }));
    } else {
      patchState({ user: result });
    }
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    const result: any = API.signOut();
    if (result && result.error) {
      patchState({ error: result.error });
    } else {
      patchState({ user: null });
    }
  }

  @Action(AuthActionFail)
  authActionFail(
    { patchState }: StateContext<AuthStateModel>,
    { payload: { action, error } }: AuthActionFail
  ) {
    patchState({ error: { ...error, action: action } });
  }
}
