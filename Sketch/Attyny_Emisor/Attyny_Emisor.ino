#define CE_PIN 3
#define CSN_PIN 3


#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(CE_PIN, CSN_PIN);
float data[1];

const uint64_t pipe = 0xE8E8F0F0E1LL;

void setup() {
  
  radio.begin();
  radio.openWritingPipe(pipe);
}

void loop(void){
  
   data[0] = random(-20,70);
   radio.write(data, sizeof(data));
   delay(3000);
}
