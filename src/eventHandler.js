import moment from 'moment-timezone';

const eventHandler = async (event) => {
    const { type } = event;

    switch (type) {
        case 'Message4Bot':
            await handleMessage4Bot(event);
            break;
        case 'BotJoinGroup':
            await handleBotJoinedGroup(event);
            break;
    }
};

const handleMessage4Bot = async (event) => {
    const { text, bot, group, userId, message } = event;
    const team = message.mentions.pop();
    const start = moment();
    const remainder = 15 - (start.minute() % 15);
    const startTime = moment(start).add(remainder, 'minutes');
    const endTime = moment(startTime).add(1, 'h');

    const name = await getUser(event);

    if (text.includes('lunch')) {
        let obj = {
            title: `${name} AFK - LUNCH`,
            startTime: startTime,
            endTime: endTime,
            recurrence: 'None',
            endingCondition: 'None',
            creatorId: userId,
            endingAfter: 1,
            color: 'Orange',
            allDay: false,
        };

        // console.log(obj);
        try {
            const res = await bot.rc.post(`/restapi/v1.0/glip/events`, obj);
            // console.log(res.data);
            await bot.sendMessage(team.id, {
                text: `![:Person](${userId})`,
                attachments: [
                    {
                        id: res.data.id,
                        type: 'Event',
                    },
                ],
            });
        } catch (error) {
            console.log(error.data);
        }
    }

    await bot.sendMessage(group.id, { text: 'Sent' });
};

const handleBotJoinedGroup = async (event) => {
    const { bot, group } = event;
    await bot.sendMessage(group.id, {
        text:
            'Thank you for using the RingCentral Chatbot template. Edit eventHandler.js to customize responses.',
    });
};

const getUser = async ({ bot, userId }) => {
    const { rc } = await bot.getUser(userId);

    return rc.name;
};

export default eventHandler;
