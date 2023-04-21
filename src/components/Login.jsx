import { useReducer } from 'react';

export function Login() {
    let [state, dispatch] = useReducer((state, action) => ({
        ...state,
        ...action
    }), {
        email: '',
        password: ''
    })
    return (
        <div>
            <div className="filed">
                <div className="control">
                    <label value={state.email} className="label is-sucess">Email</label>
                    <input className="input" type="text" onChange={(e) => { dispatch({ email: e.target.value }) }}></input>
                </div>
            </div>

            <div className="filed">
                <div className="control">
                    <label className="label is-sucess">Password</label>
                    <input value={state.password} className="input" type="password" onChange={(e) => { dispatch({ password: e.target.value }) }}></input>
                </div>
            </div>

        </div>
    )
}