type Callback = (...args: any[]) => any;
type Subscription = {
  unsubscribe: () => void;
};

class EventEmitter {
  private eventStore: Map<string, (Callback | undefined)[]> = new Map();

  subscribe(eventName: string, callback: Callback): Subscription {
    const value = this.eventStore.get(eventName);
    const index = value !== undefined ? value.length : 0;
    this.eventStore.set(
      eventName,
      value !== undefined ? [...value, callback] : [callback]
    );

    return {
      unsubscribe: () => {
        if (this.eventStore.has(eventName)) {
          this.eventStore.get(eventName)![index] = undefined;
        }
      },
    };
  }

  emit(eventName: string, args: any[] = []): any[] {
    if (this.eventStore.has(eventName)) {
      return this.eventStore
        .get(eventName)!
        .filter((v) => v !== undefined)
        .reduce((acc: any[], cur) => {
          return [...acc, cur(...args)];
        }, []);
    } else {
      return [];
    }
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */

// 回答見て思ったけど、そうか、subscribe に渡されるコールバックは参照的に同一でないのか。それならそのコールバックで unsubscribe できるから index を用意する必要なかった。
