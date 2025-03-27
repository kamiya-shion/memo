export class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  // NOTE: デフォルトで public の data フィールドを持つ
  constructor(public data: T) {}
}

export interface ILinkedList<T> {
  insertInBegin(data: T): Node<T>;
  insertAtEnd(data: T): Node<T>;
  deleteNode(node: Node<T>): void;
  traverse(): T[];
  size(): number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;

  public insertInBegin(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    return node;
  }

  public insertAtEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);
      node.prev = lastNode;
      lastNode.next = node;
    }
    return node;
  }

  public deleteNode(node: Node<T>): void {
    if (!node.prev) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }
  }

  public traverse(): T[] {
    const array: T[] = [];
    if (!this.head) {
      return array;
    }

    const addToArray = (node: Node<T>): T[] => {
      array.push(node.data);
      return node.next ? addToArray(node.next) : array;
    };

    return addToArray(this.head);
  }

  public size(): number {
    return this.traverse().length;
  }
}

const linkedList = new LinkedList();
linkedList.insertInBegin(10);
linkedList.insertInBegin(20);

console.log("START");
console.log(linkedList.traverse());
console.log("END");
