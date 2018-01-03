export default function (state, action) {
    state = state || JSON.parse(localStorage.getItem('student_life_teacher_session')) || {
        Token: null,
        User: {id: null, name: null, job: null}
    };
    let new_state;
    switch (action.type) {
        case 'SESSION:UP':
            new_state = {Token: action.token, User: action.user};
            localStorage.setItem('student_life_teacher_session', JSON.stringify(new_state));
            return new_state;
        case 'TOKEN:SET':
            new_state = Object.assign({}, state, {Token: action.token});
            localStorage.setItem('student_life_teacher_session', JSON.stringify(new_state));
            return new_state;
        case 'USER:SET':
            new_state = Object.assign({}, state, {User: action.user});
            localStorage.setItem('student_life_teacher_session', JSON.stringify(new_state));
            return new_state;
        case 'SESSION:DOWN':
            localStorage.setItem('student_life_teacher_session', null);
            return {Token: null, User: null};
        default:
            return state;
    }
};