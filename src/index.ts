//블록 구조 
class Block{
  public index:number;
  public hash:string;
  public previousHash : string;
  public data : string;
  public timestamp : number;
  constructor(  //함수
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
    ){
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "1231243532", "", "Hello", 123456);

let blockchain: [Block] = [genesisBlock];
//타입스크립트는 블록만 블록체인에 들어갈 수 있게 해준다.
console.log(blockchain);
//블록체인 : 블록의 연결

export {};