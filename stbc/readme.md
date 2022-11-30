# Simple Text to Binary Coverter
text to binary, binary to text, numebrs to binary and binary to numbers<br><br>


Created this project cause i was studying how to convert text and numbers to binary.

This project was created following the steps of conversion. I dindn't use the toString() method.<br>
First needed to get the keyCodes of the characters.<br>
Then, made the math with 128, 64, 32, 16, 8, 4, 2, 1.<br>
And finally, i got the 1s and 0s i needed.

The number convertion was pretty much the same.<br><br>

<b>Text to binary and back is always with the leading zeros.<br>
Numbers to binary and back is not.</b><br><br>

You have a easter bunny if you want to dig into it.


# How to make this work

copy and paste the code bellow to your html file<br>
```javascript
<textarea name="keys" id="keys" placeholder="Paste or write your text. Click the button and convert text to binary."></textarea>
<div class="buttons">
    <button id="translate" action="tobinary">Text to Binary</button>
    <button id="swap">Swap conversion</button>
    <button id="textToNumbers" action="texttonumbers">Convert Numbers</button>
</div>
<div id="result"></div>
```
<br>
include jquery and app.js file on your html file and you're good to go.
