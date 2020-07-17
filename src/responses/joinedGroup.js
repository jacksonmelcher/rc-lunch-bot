export const joinedGroup = {
    attachments: [
        {
            type: 'Card',

            author: {
                name: 'Lunch Bot',
            },
            title: 'Instructions',
            text:
                "I'm Lunch Bot. I automatically create lunch events. You can use me by sending me a direct message with the keyword **Lunch** " +
                'followed by the team you want the event to be forwarded to.',
            fields: [
                {
                    title: 'Create lunch event at next 15 minute interval.',
                    value: 'lunch **@Team**',
                    style: 'Long',
                },
                {
                    title: 'Create lunch event right now.',
                    value: 'lunch now **@Team**',
                    style: 'Long',
                },
            ],
            footnote: {
                text: 'Created and maintained by RC on RC',
            },
        },
    ],
};
