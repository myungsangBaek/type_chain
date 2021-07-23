import * as CryptoJS from "crypto-js";
import { isBlock } from "typescript";

//블록 구조 
class Block{

//static method = 메서드가 block class 안에 있고 클래스가 생성되지 않아도 호출 가능한 class
  static calculateBlockHash = (
    index:number, 
    previousHash:string, 
    timestamp:number, 
    data:string):  string => 
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

 //블록의 구조가 유효한지 아닌지 체크   
  static validateStructure = (aBlock : Block) : boolean =>  
    typeof aBlock.index === "number" && 
    typeof aBlock.hash ==="string" && 
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

   
  //블록구조
  public index:number;
  public hash:string;
  public previousHash : string;
  public data : string;
  public timestamp: number;
 
    
  
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

let blockchain: Block[] = [genesisBlock]; //타입스크립트는 블록만 블록체인에 들어갈 수 있게 해준다.

const getBlockchain = () : Block[] => blockchain;  // => 블록체인을 리턴

const getLatestBlock =() : Block => blockchain[blockchain.length - 1]; //블록체인이 얼마나 긴지 알기위한 변수 블록체인 중에서 가장 최근

const getNewTimeStamp =() : number => Math.round(new Date().getTime() / 1000);
//블록체인 : 블록의 연결
//블록을 만들기 위해서는 해쉬가 필요하고 해쉬는 모든 속성을 길고 수학적으로 하나의 문자열로 결합한 것 

const createNewBlock = (data:string) : Block =>{
  const previousBlock : Block = getLatestBlock();
  const newIndex : number = previousBlock.index + 1;
  const newTimestamp : number = getNewTimeStamp();
  const newHash : string = Block.calculateBlockHash(
    newIndex, 
    previousBlock.hash, 
    newTimestamp, 
    data
    );
  const newBlock : Block = new Block(
    newIndex, 
    newHash, 
    previousBlock.hash,
    data, 
    newTimestamp
    );
    return newBlock;
};
//검증과정
const getHashforBlock = (aBlock : Block) :string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data); //해쉬 검증

const isBlockVaild = (candidateBlock : Block, previousBlock : Block) : boolean => {
  if(Block.validateStructure(candidateBlock)){ //구조를 검증 후 유효하지 않으면 false 리턴
    return false;
  }else if(previousBlock.index + 1 !== candidateBlock.index){ //previous블록의 인덱스+1과 candidate블록의 인덱스가 다르면 false 리턴
    return false;
  }else if(previousBlock.hash !== candidateBlock.previousHash){ //previous블록의 해쉬가 candidate blcok previous hash와 같이 않다면 false 리턴
    return false;
  }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){ //해쉬를 계산했는데 다른 해쉬를 갖고있다면 false 리턴
    return false;
  }else {
    return true;
  }
};

const addBlock = (candidateBlock : Block) : void => {
  if(isBlockVaild(candidateBlock, getLatestBlock())){
    blockchain.push(candidateBlock);
  }
};


export {};