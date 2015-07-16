/**
 * AuthService Factory
 * @namespace Factory
 */
challengeChatApp
.factory('AuthService', [function () {
    'use strict';
    /**
     * @namespace AuthService
     * @desc Authentification Service
     * @memberOf Factory
     */
    var user = {
        name: "Mihai",
        email: "email@email.com"
    };
    /**
     * @name getUser
     * @desc Returns user object
     * @param {undefined}
     * @returns {Object}
     * @memberOf Factory.AuthService
     */
    function getUser () {
        return user;
    }
    /**
     * @name setUser
     * @desc Set's data for the user
     * @param {String, String} userName is the name of the user, userEmail is the email of the user
     * @returns {boolean}
     * @memberOf Factory.AuthService
     */
    function setUser(userName, userEmail){
        user = {
            name: userName,
            email: userEmail
        }
        return true;
    }

    return {
        getUser: getUser,
        setUser: setUser
    };
}]);
