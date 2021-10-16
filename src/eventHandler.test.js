const rewire = require("rewire")
const eventHandler = rewire("./eventHandler")
const handleBotJoinedGroup = eventHandler.__get__("handleBotJoinedGroup")
const handleMessage4Bot = eventHandler.__get__("handleMessage4Bot")
const getUser = eventHandler.__get__("getUser")
const createEvent = eventHandler.__get__("createEvent")
// @ponicode
describe("eventHandler.default", () => {
    test("0", async () => {
        await eventHandler.default(["withdrawal", "deposit", "invoice"])
    })

    test("1", async () => {
        await eventHandler.default(["invoice", "payment", "payment"])
    })

    test("2", async () => {
        await eventHandler.default(["invoice", "invoice", "payment"])
    })

    test("3", async () => {
        await eventHandler.default(["invoice", "invoice", "invoice"])
    })

    test("4", async () => {
        await eventHandler.default(["invoice", "deposit", "invoice"])
    })

    test("5", async () => {
        await eventHandler.default(undefined)
    })
})

// @ponicode
describe("handleBotJoinedGroup", () => {
    test("0", async () => {
        await handleBotJoinedGroup({ bot: { sendMessage: () => "Could not find a grader object for message from xqueue" }, group: { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } })
    })

    test("1", async () => {
        await handleBotJoinedGroup({ bot: { sendMessage: () => "Bad Authentication data" }, group: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } })
    })

    test("2", async () => {
        await handleBotJoinedGroup({ bot: { sendMessage: () => "Internal Server Error\n" }, group: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } })
    })

    test("3", async () => {
        await handleBotJoinedGroup({ bot: { sendMessage: () => "Mock Error Message" }, group: { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" } })
    })

    test("4", async () => {
        await handleBotJoinedGroup({ bot: { sendMessage: () => "There is a mismatch" }, group: { id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } })
    })

    test("5", async () => {
        await handleBotJoinedGroup({ bot: undefined, group: undefined })
    })
})

// @ponicode
describe("handleMessage4Bot", () => {
    test("0", async () => {
        await handleMessage4Bot("invoice")
    })

    test("1", async () => {
        await handleMessage4Bot("payment")
    })

    test("2", async () => {
        await handleMessage4Bot("withdrawal")
    })

    test("3", async () => {
        await handleMessage4Bot("deposit")
    })

    test("4", async () => {
        await handleMessage4Bot(undefined)
    })
})

// @ponicode
describe("getUser", () => {
    test("0", async () => {
        await getUser({ bot: { getUser: () => "user-name" }, userId: "c466a48309794261b64a4f02cfcc3d64" })
    })

    test("1", async () => {
        await getUser({ bot: { getUser: () => "user-name" }, userId: "bc23a9d531064583ace8f67dad60f6bb" })
    })

    test("2", async () => {
        await getUser({ bot: { getUser: () => 123 }, userId: "da7588892" })
    })

    test("3", async () => {
        await getUser({ bot: { getUser: () => "username" }, userId: "bc23a9d531064583ace8f67dad60f6bb" })
    })

    test("4", async () => {
        await getUser({ bot: { getUser: () => "username" }, userId: 12345 })
    })

    test("5", async () => {
        await getUser({ bot: undefined, userId: undefined })
    })
})

// @ponicode
describe("createEvent", () => {
    test("0", async () => {
        await createEvent({ bot: { rc: { post: () => "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", put: () => 16, delete: () => "Architect" }, sendMessage: () => "This is an exception, voilà" }, userId: "bc23a9d531064583ace8f67dad60f6bb", group: "Quality" }, "Marketing", { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
    })

    test("1", async () => {
        await createEvent({ bot: { rc: { post: () => "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", put: () => 1, delete: () => "Producer" }, sendMessage: () => "Message recipient is not the grader, the person being graded, or the controller" }, userId: "c466a48309794261b64a4f02cfcc3d64", group: "Configuration" }, "Data Scientist", { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
    })

    test("2", async () => {
        await createEvent({ bot: { rc: { post: () => "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", put: () => 1, delete: () => "Producer" }, sendMessage: () => "This is an exception, voilà" }, userId: "da7588892", group: "Configuration" }, "Chief Product Officer", { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
    })

    test("3", async () => {
        await createEvent({ bot: { rc: { post: () => "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", put: () => 80, delete: () => "Developer" }, sendMessage: () => "No response" }, userId: "c466a48309794261b64a4f02cfcc3d64", group: "Implementation" }, "Software Engineer", { id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
    })

    test("4", async () => {
        await createEvent({ bot: { rc: { post: () => "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", put: () => 2, delete: () => "Producer" }, sendMessage: () => "Error:" }, userId: "bc23a9d531064583ace8f67dad60f6bb", group: "Identity" }, "Data Scientist", { id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" })
    })

    test("5", async () => {
        await createEvent({ bot: undefined, userId: undefined, group: "" }, undefined, undefined)
    })
})
