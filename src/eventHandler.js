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

const handleBotJoinedGroup = async ({ bot, group }) => {
    await bot.sendMessage(group.id, joinedGroup);
};

const handleMessage4Bot = async (event) => {
    const { text, bot, group, userId, message } = event;
    const userInfo = await bot.getUser(userId);
    console.log(
        '======================= USER ID FROM bot.getUser() ===================='
    );
    console.log(userInfo.rc);

    console.log('=======================  ====================');
    const info = await getUser(event);
    const creatorId = userInfo.rc.id;
    let start = null;
    let remainder = null;
    let startTime = null;
    let endTime = null;

    if (text.includes('help')) {
        await bot.sendMessage(group.id, joinedGroup);
    } else if (!message.mentions) {
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
    const obj = {
        title: `${info.name} AFK - LUNCH`,
        startTime: startTime,
        endTime: endTime,
        recurrence: 'None',
        endingCondition: 'None',
        creatorId: creatorId,
        endingAfter: 1,
        color: 'Orange',
        allDay: false,
    };
    console.log('Event CREATOR ID:');
    console.log(obj);

    let res = '';
    try {
        res = await createEvent(event, obj, team);
        console.log(res.data);
        await bot.sendMessage(group.id, {
            text: `Here is your lunch event. It will be sent to ![:Team](${team.id}).`,
            attachments: [
                {
                    id: res.data.id,
                    type: 'Event',
                },
            ],
        });
    } catch (error) {
        await bot.sendMessage(group.id, {
            text: `Oops! It doesnt look like I'm allowed to post in ![:Team](${team.id}). Please add me as a member and retry your lunch request.`,
        });
    }
};

const getUser = async ({ bot, userId }) => {
    const { rc } = await bot.getUser(userId);
    const { regionalSettings, name } = rc;

    return { name, regionalSettings };
};

const createEvent = async ({ bot, userId, group }, obj, team) => {
    const res = await bot.rc.post(`/restapi/v1.0/glip/events`, obj);
    console.log('Created event');
    console.log('==================RESPONSE FROM /glip/events===============');
    console.log(res.data);
    console.log('==================RESPONSE===============');
    const putRes = await bot.rc.put(
        `/restapi/v1.0/glip/events/${res.data.id}`,
        {
            creatorId: userId,
        }
    );
    console.log(putRes);
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

        await bot.rc.delete(`/restapi/v1.0/glip/events/${res.data.id}`);
        throw 'I need to be added to the group you tagged.';
    }

    return res;
};

export default eventHandler;
