import * as CryptoJS from "crypto-js";

//블록 구조 
class Block{
  public index:number;
  public hash:string;
  public previousHash : string;
  public data : string;
  public timestamp : number;

//static method = 메서드가 block class 안에 있고 클래스가 생성되지 않아도 호출 가능한 class
  static calculateBlockHash = (index:number, previousHash:string, timestamp:number, data:string) :string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    
  

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

let blockchain: Block[] = [genesisBlock];
//타입스크립트는 블록만 블록체인에 들어갈 수 있게 해준다.
const getBlockchain = () : Block[] => blockchain;  // => 블록체인을 리턴

const getLatestBlock =() : Block => blockchain[blockchain.length - 1]; //블록체인이 얼마나 긴지 알기위한 변수 블록체인 중에서 가장 최근

const getNewTimeStamp =() : number => Math.round(new Date().getTime() / 1000);
//블록체인 : 블록의 연결
//블록을 만들기 위해서는 해쉬가 필요하고 해쉬는 모든 속성을 길고 수학적으로 하나의 문자열로 결합한 것 
export {};