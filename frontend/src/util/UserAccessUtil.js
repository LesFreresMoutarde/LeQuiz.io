import App from "../components/App";

class UserAccessUtil {
    /**
     * @enum {string}
     */
    static ROLES = {
        GUEST_ONLY: 'guestOnly',
        LOGGED_IN: 'loggedIn',
    }

    /**
     * @param {UserAccessUtil.ROLES} role
     * @param {string} redirect The URL to which the user is redirected if he does not have the required role
     * @return {boolean} True if user has access to component, false otherwise
     */
    static componentRequiresRole = (role, redirect = '/') => {
        switch(role) {
            case UserAccessUtil.ROLES.GUEST_ONLY:
                if(App.GLOBAL.state.user) {
                    App.GLOBAL.redirectTo(redirect);
                    return false;
                }
                break;
            case UserAccessUtil.ROLES.LOGGED_IN:
                if(!App.GLOBAL.state.user) {
                    App.GLOBAL.redirectTo(redirect);
                    return false;
                }
                break;
            default:
                throw new Error('Unknown required role');
        }

        return true;
    }
}

export default UserAccessUtil;
