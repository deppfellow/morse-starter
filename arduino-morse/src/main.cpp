#include <Arduino.h>

const int UNIT = 200;
const int BUZZER_PIN = 8;
const int LED_PIN = LED_BUILTIN;

struct MorseEntry
{
  char letter;
  const char *code;
};

MorseEntry table[] = {
    {'A', ".-"}, {'B', "-..."}, {'C', "-.-."}, {'D', "-.."}, {'E', "."}, {'F', "..-."}, {'G', "--."}, {'H', "...."}, {'I', ".."}, {'J', ".---"}, {'K', "-.-"}, {'L', ".-.."}, {'M', "--"}, {'N', "-."}, {'O', "---"}, {'P', ".--."}, {'Q', "--.-"}, {'R', ".-."}, {'S', "..."}, {'T', "-"}, {'U', "..-"}, {'V', "...-"}, {'W', ".--"}, {'X', "-..-"}, {'Y', "-.--"}, {'Z', "--.."}, {'1', ".----"}, {'2', "..---"}, {'3', "...--"}, {'4', "....-"}, {'5', "....."}, {'6', "-...."}, {'7', "--..."}, {'8', "---.."}, {'9', "----."}, {'0', "-----"}};

const char *lookupMorse(char c)
{
  c = toupper(c);
  for (auto &entry : table)
  {
    if (entry.letter == c)
      return entry.code;
  }
  return nullptr;
}

void playMorseChar(char c)
{
  if (c == ' ')
  {
    delay(7 * UNIT);
    return;
  }

  const char *code = lookupMorse(c);
  if (!code)
    return;

  for (int i = 0; code[i] != '\0'; i++)
  {
    int duration = (code[i] == '.') ? UNIT : 3 * UNIT;
    digitalWrite(LED_PIN, HIGH);
    tone(BUZZER_PIN, 600);
    delay(duration);
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
    delay(UNIT);
  }
  delay(3 * UNIT);
}

// Logic abstraction: This is what your summary claimed you had.
void playMorse(String msg)
{
  Serial.print("Playing: ");
  Serial.println(msg);
  for (int i = 0; i < msg.length(); i++)
  {
    playMorseChar(msg[i]);
  }
}

void setup()
{
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  static String input = "";
  while (Serial.available())
  {
    char c = Serial.read();
    if (c == '\n')
    {
      playMorse(input);
      input = "";
    }
    else
    {
      input += c;
    }
  }
}