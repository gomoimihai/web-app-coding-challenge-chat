'use strict';

describe('factory: Chat Box Service', function () {
    var httpBackend,
    ChatBoxService,
    response = ["message-test"],
    apiUrl = 'http://coding-challenges.dispatchertrucking.com:8080/chat-messages';

    beforeEach(module('challengeChat'));

    beforeEach(inject(function(_ChatBoxService_, $httpBackend) {
        httpBackend = $httpBackend;
        httpBackend.whenGET(apiUrl).respond(response);
        ChatBoxService = _ChatBoxService_;
    }));

    it('should get all messages', function(){
        ChatBoxService.getAllMessages().then(function(result){
                expect(result).toEqual(response);
        });
        httpBackend.flush();
    });
});
