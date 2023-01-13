const test = {
    "id": 11,
    "name": "",
    "type": "private",
    "avatar": null,
    "members": [
        {
            "userId": 1,
            "chatId": 11
        },
        {
            "userId": 2,
            "chatId": 11
        }
    ]
}
test.members = test.members.map((obj) => obj.userId)

console.log(test)

