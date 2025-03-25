(() => {
  /*
  前提として、直接数値に変換してはならないため、charCodeAt を使用して文字を数値に変換するテクニックを使用する。
  */

  function addStrings(num1: string, num2: string): string {
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    let result = "";

    while (i >= 0 || j >= 0 || carry > 0) {
      // "0".charCodeAt(0) は 48 であり、差を求めることで数値に変換できる
      // 例) "3" の Unicode 値は 51 であり、51 - 48 = 3
      const n1 = i >= 0 ? num1.charCodeAt(i) - "0".charCodeAt(0) : 0;
      const n2 = j >= 0 ? num2.charCodeAt(j) - "0".charCodeAt(0) : 0;
      const sum = n1 + n2 + carry;
      carry = Math.floor(sum / 10);
      result = `${sum % 10}${result}`;

      i--;
      j--;
    }

    return result;
  }
})();
