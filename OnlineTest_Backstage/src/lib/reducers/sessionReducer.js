export default function (state, action) {
    state = state || JSON.parse(localStorage.getItem('online_test_admin_session')) || {
        Authorization: null,
        User: {id: null, name: null, job: null}
    };
    let new_state;
    switch (action.type) {
        case 'SESSION:UP':
            new_state = {Authorization: action.token, User: action.user};
            localStorage.setItem('online_test_admin_session', JSON.stringify(new_state));
            return new_state;
        case 'TOKEN:SET':
            new_state = Object.assign({}, state, {Authorization: action.token});
            localStorage.setItem('online_test_admin_session', JSON.stringify(new_state));
            return new_state;
        case 'USER:SET':
            new_state = Object.assign({}, state, {User: action.user});
            localStorage.setItem('online_test_admin_session', JSON.stringify(new_state));
            return new_state;
        case 'SESSION:DOWN':
            localStorage.setItem('online_test_admin_session', null);
            return {Authorization: null, User: null};
        default:
            return state;
    }
};