'use strict';
describe('factory: Chat Box Service', function () {
    var httpBackend,
    ChatBoxService,
    formatedMessage = [{
        who: 'Anonymous',
        notes: '',
        date: '',
        face: 'https://robohash.org/example@example.com.png'}],
    unFormatedMessage = {
        user: 'Anonymous',
        text: '',
        time: '',
        email: 'example@example.com',
        face: 'https://robohash.org/example@example.com.png'},
    apiUrl = 'http://coding-challenges.dispatchertrucking.com:8080/chat-messages';

    beforeEach(module('challengeChat'));

    beforeEach(inject(function(_ChatBoxService_, $httpBackend) {
        httpBackend = $httpBackend;
        httpBackend.whenGET(apiUrl).respond(formatedMessage);
        httpBackend.whenPOST(apiUrl).respond([]);
        ChatBoxService = _ChatBoxService_;
    }));

    it('should get all messages', function(){
        ChatBoxService.getAllMessages().then(function(result){
            expect(result).toEqual(formatedMessage);
        });
        httpBackend.flush();
    });

    it('should send a message', function(){
        ChatBoxService.sendMessage('hello', 'hello', 'hello').then(function(result){
            expect(result).toEqual([]);
        });
        httpBackend.flush();
    });

    it('should format message', function(){
        expect(ChatBoxService.formatMessage(unFormatedMessage)).toEqual(formatedMessage[0]);
    });
});