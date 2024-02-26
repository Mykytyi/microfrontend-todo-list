
export type Message = {
  type: 'error' | 'success' | 'info',
  message: string,
}

type AddMessage = {
  type: 'ADD_MESSAGE',
  message: Message,
}

type RemoveMessage = {
  type: 'REMOVE_MESSAGE',
}

export type AppActions = AddMessage | RemoveMessage;

export const addMessage = (message: Message): AddMessage => {
  return {
    type: 'ADD_MESSAGE',
    message,
  }
};

export const removeMessage = (): RemoveMessage => {
  return {
    type: 'REMOVE_MESSAGE',
  }
};

