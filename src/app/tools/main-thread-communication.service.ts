import {
  Injectable
} from '@angular/core';

import {
  ipcRenderer
} from 'electron';
/*const {ipcRenderer} = require('electron');*/

interface IpcReply<T> {
  payload?: T;
  error?: string;
}

/**
 * A service to communicate in a standardized way with the main thread.
 */
@Injectable()
export class MainThreadCommunicationService {
  /**
   * Send a message on a channel with a serialized payload of type T.
   * The channel is of the form {channel}:message with {channel} the
   * parameter given to the function.
   * {
   *   payload: SERIALIZED_VERSION_OF_MSG
   * }
   *
   * @return a promise to the value returned by the main thread
   * unserialized to the type U. The promise may be rejected with a
   * string error reason.
   *
   * Implementation notes:
   * ---------------------
   * the main thread returns on the {channel}:reply channel:
   *  - if the request is a success:
   *     {
   *       payload: VALUE_UNSERIALIZABLE_TO_TYPE_U
   *     }
   *  - if the request failed:
   *     {
   *       error: "A string reason"
   *     }
   */
  ask<T, U>(channel: string, msg: T): Promise<U> {
    let sendChannel = channel + ":message";
    let replyChannel = channel + ':reply';

    let promise = new Promise<U>((resolve, reject) => {
      // register a callback for a single reply
      ipcRenderer.once(replyChannel, (event: any, reply: IpcReply<U>) => {
        if(reply.error) {
          reject(reply.error);
        }
        else {
          resolve(reply.payload);
        }
      });

      // send the message
      ipcRenderer.send(sendChannel, {payload: msg});
    });
    return promise;
  }

  /**
   * Add a callback to listen to a channel.
   * The channel is of the form {channel}:events with {channel} being the
   * first arg of the function.
   */
  listen<U>(channel: string, callback: (U) => void): void {
    ipcRenderer.on(channel + ':events', callback);
  }

  unlisten<U>(channel: string, callback: (U) => void): void {
    ipcRenderer.removeListener(channel + ':events', callback);
  }
}
