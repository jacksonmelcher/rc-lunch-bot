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

    if (!message.mentions) {
        await bot.sendMessage(group.id, {
            text: 'Please mention a team I can send the event to.',
        });
        return;
    }

    const info = await getUser(event);

    let start = null;
    let remainder = null;
    let startTime = null;
    let endTime = null;

    const team = message.mentions.pop();

    if (text.includes('lunch') && text.includes('now')) {
        startTime = moment().startOf('minute');
        endTime = moment(startTime).add(1, 'h');
    } else if (text.includes('lunch')) {
        start = moment();
        remainder = 15 - (start.minute() % 15);
        startTime = moment(start).add(remainder, 'minutes');
        endTime = moment(startTime).add(1, 'h');
    }
    let obj = {
        title: `${info.name} AFK - LUNCH`,
        startTime: startTime,
        endTime: endTime,
        recurrence: 'None',
        endingCondition: 'None',
        creatorId: userId,
        endingAfter: 1,
        color: 'Orange',
        allDay: false,
    };
    let res = await createEvent(event, obj, team);
    console.log(res.data.id);
    await bot.sendMessage(group.id, {
        text:
            'Here is your lunch event. You can edit it if times change and it will be updated globally.',
        attachments: [
            {
                id: res.data.id,
                type: 'Event',
            },
        ],
    });
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
    const { regionalSettings, name } = rc;

    return { name, regionalSettings };
};

const createEvent = async ({ bot, userId }, obj, team) => {
    try {
        const res = await bot.rc.post(`/restapi/v1.0/glip/events`, obj);
        await bot.sendMessage(team.id, {
            text: `![:Person](${userId})`,
            attachments: [
                {
                    id: res.data.id,
                    type: 'Event',
                },
            ],
        });
        return res;
    } catch (error) {
        console.log(error.data);
    }
};

export default eventHandler;
