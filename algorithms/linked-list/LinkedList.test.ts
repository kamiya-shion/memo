import { LinkedList, Node } from "./LinkedList"; // パスは適宜変更してください

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test("should insert node at the beginning", () => {
    const node = list.insertInBegin(10);
    expect(node.data).toBe(10);
    expect(list.traverse()).toEqual([10]);
    expect(list.size()).toBe(1);
  });

  test("should insert nodes at the beginning in correct order", () => {
    list.insertInBegin(10);
    list.insertInBegin(20);
    expect(list.traverse()).toEqual([20, 10]);
  });

  test("should insert node at the end", () => {
    list.insertInBegin(10);
    list.insertAtEnd(20);
    expect(list.traverse()).toEqual([10, 20]);
    expect(list.size()).toBe(2);
  });

  test("should delete head node", () => {
    const node1 = list.insertInBegin(10);
    list.insertAtEnd(20);
    list.deleteNode(node1);
    expect(list.traverse()).toEqual([20]);
    expect(list.size()).toBe(1);
  });

  test("should delete middle node", () => {
    list.insertInBegin(10);
    const node2 = list.insertAtEnd(20);
    list.insertAtEnd(30);
    list.deleteNode(node2);
    expect(list.traverse()).toEqual([10, 30]);
  });

  test("should handle delete of last node", () => {
    list.insertInBegin(10);
    const node2 = list.insertAtEnd(20);
    list.deleteNode(node2);
    expect(list.traverse()).toEqual([10]);
  });

  test("should handle deleting from empty list", () => {
    const dummyNode = new Node<number>(999);
    // 空リストからの削除でもエラーにならないことを確認
    expect(() => list.deleteNode(dummyNode)).not.toThrow();
  });

  test("traverse on empty list should return empty array", () => {
    expect(list.traverse()).toEqual([]);
    expect(list.size()).toBe(0);
  });
});
