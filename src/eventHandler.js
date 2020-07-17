import moment from 'moment-timezone';
import { joinedGroup } from './responses/joinedGroup';

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

    const info = await getUser(event);

    let start = null;
    let remainder = null;
    let startTime = null;
    let endTime = null;

    if (text.includes('help')) {
        await bot.sendMessage(group.id, joinedGroup);
    }

    if (!message.mentions) {
        await bot.sendMessage(group.id, {
            text: 'Please mention a team I can send the event to.',
        });
        return;
    }
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
    try {
        let res = await createEvent(event, obj, team);
        console.log(res.data);
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
    } catch (error) {
        console.log(error);
        await bot.sendMessage(group.id, {
            text: error,
        });
    }
};

const handleBotJoinedGroup = async ({ bot, group }) => {
    await bot.sendMessage(group.id, joinedGroup);
};

const getUser = async ({ bot, userId }) => {
    const { rc } = await bot.getUser(userId);
    const { regionalSettings, name } = rc;

    return { name, regionalSettings };
};

const createEvent = async ({ bot, userId, group }, obj, team) => {
    try {
        const res = await bot.rc.post(`/restapi/v1.0/glip/events`, obj);
        await forward(userId, team, group, bot, res);
        return res;
    } catch (error) {
        console.log(error.data);
        throw `There was a problem forwarding your event. Please ensure I am added to ![:Team](${team.id})`;
    }
};

const forward = async (userId, team, group, bot) => {
    try {
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
        console.log(error.data.message);
        // await bot.sendMessage(group.id, { text: error.data.message });
        await bot.rc.delete(`/restapi/v1.0/glip/events/${res.data.id}`);
        throw 'I need to be added to the group you tagged.';
    }
};

export default eventHandler;
