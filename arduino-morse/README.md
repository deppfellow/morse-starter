# Hardware Logic

Logic that define the blinking and buzzing of the hardwares. Logic code that define the blinking and buzzing of each char is defined in function `playMorseChar`:

```cpp
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
```

Function above take each char from the message and turn the LED and buzzer on based on map from defined morse code. Each dot have duration of `200ms` and each dash have `600ms`.

While the function that store the full message and loop through each char is in function `playMorse`:

```cpp
void playMorse(String msg)
{
  Serial.print("Playing: ");
  Serial.println(msg);
  for (int i = 0; i < msg.length(); i++)
  {
    playMorseChar(msg[i]);
  }
}
```

Function above take the full message and loop through each char and execute `playMorseChar` function.
