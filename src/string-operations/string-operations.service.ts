import { Injectable } from '@nestjs/common';


@Injectable()
export class StringOperationsService {
  countVowels(word: string) {
    countByVowels(word, vowelsQuantity)
  }
}

function vowelsQuantity(vowelsQuantity: number) {
  console.log('Quantity of vowels', vowelsQuantity);
}

function countByVowels(word: string, callback: (vowelsQuantity: number) =>  void) {
  console.log("entrou");
  var letters = word.split('');
  let countLetter = 0;
  const vowels = ["a", "e", "i", "o", "u"];
  letters.forEach(letter => {

    if(vowels.includes(letter.toLocaleLowerCase())){
      countLetter = countLetter + 1;
    }

  });
  console.log("qtde vogais", countLetter);

  return callback(countLetter);
}