'use strict';
describe('factory: Auth Servoce', function () {
    var AuthService,
    user = {
        name: 'Mihai',
        email: 'email@email.com'
    },
    editedUser = {
        name: 'test',
        email: 'test'
    };

    beforeEach(module('challengeChat'));

    beforeEach(inject(function(_AuthService_) {
        AuthService = _AuthService_;
    }));

    it('should get user', function(){
       expect(AuthService.getUser()).toEqual(user);
    });

    it('should edit user', function(){
        AuthService.setUser('test', 'test')
        expect(AuthService.getUser()).toEqual(editedUser);
    });
});