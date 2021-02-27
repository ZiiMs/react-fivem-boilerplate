let events = {
    key: Function
} = {}

export default class Nui {
    static post(event, data ={}, resName = GetParentResourceName()) {
        return fetch(`http://${resName}/${event}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        });
    }

    static onEvent(type, func) {
        if(events[type]) {
            console.log(
                `%c[Nui.onEvent]%c: Event ${type} is already declared.`,
                "color = red;", "color = white;"
            )
        }
    }

    static emitEvent(type, payload) {
        window.dispatchEvent(new MessageEvent("message", {
            data: {type, payload}
        }))
    }
};

export const EventListener = () => {
    window.addEventListener('message', (e) => {
        if(!events[e.data.type]) return;
        events[e.data.type](e.data.payload)
    });
    return null;
}
